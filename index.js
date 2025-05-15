const openpgp = require('openpgp');
const machineId = require('node-machine-id');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

// Configuration
const CONFIG_DIR = path.join(process.env.APPDATA || process.env.HOME, '.local-pgp');
const KEY_FILE = path.join(CONFIG_DIR, 'pgp-keys.json');
const MACHINE_HASH_FILE = path.join(CONFIG_DIR, 'machine-hash');

// Ensure config directory exists
fs.ensureDirSync(CONFIG_DIR);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Get the unique machine fingerprint
 * This is what locks the PGP to this specific computer
 */
async function getMachineFingerprint() {
  // Get the hardware ID of this machine
  const id = await machineId.machineId();
  
  // Add some system-specific data for extra uniqueness
  const osInfo = {
    platform: process.platform,
    arch: process.arch,
    hostname: require('os').hostname(),
    username: process.env.USERNAME || process.env.USER
  };
  
  // Create a composite fingerprint
  const fingerprint = `${id}-${JSON.stringify(osInfo)}`;
  
  // Return a hash of all this data
  return require('crypto').createHash('sha256').update(fingerprint).digest('hex');
}

/**
 * Verify that this is the authorized machine
 */
async function verifyMachine() {
  const currentFingerprint = await getMachineFingerprint();
  
  if (fs.existsSync(MACHINE_HASH_FILE)) {
    const storedFingerprint = await fs.readFile(MACHINE_HASH_FILE, 'utf8');
    if (currentFingerprint !== storedFingerprint) {
      console.error('ERROR: This PGP setup can only be used on the original computer.');
      process.exit(1);
    }
    return true;
  } else {
    // First time setup - save the fingerprint
    await fs.writeFile(MACHINE_HASH_FILE, currentFingerprint);
    return true;
  }
}

/**
 * Generate a new PGP key pair
 */
async function generateKeys(name, email, passphrase) {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa',
    rsaBits: 4096,
    userIDs: [{ name, email }],
    passphrase
  });

  await fs.writeJSON(KEY_FILE, {
    privateKey,
    publicKey
  });

  console.log('PGP keys generated and saved successfully!');
  console.log('\nYour public key (share this with others):');
  console.log(publicKey);
  
  return { privateKey, publicKey };
}

/**
 * Encrypt a message for a recipient
 */
async function encryptMessage(message, recipientPublicKey) {
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: message }),
    encryptionKeys: await openpgp.readKey({ armoredKey: recipientPublicKey })
  });

  return encrypted;
}

/**
 * Decrypt a message with your private key
 */
async function decryptMessage(encryptedMessage, passphrase) {
  await verifyMachine();
  
  const keys = await fs.readJSON(KEY_FILE);
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: keys.privateKey }),
    passphrase
  });

  const message = await openpgp.readMessage({
    armoredMessage: encryptedMessage
  });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey
  });

  return decrypted;
}

/**
 * Main menu function
 */
async function mainMenu() {
  console.log('\n=== Local PGP Tool ===');
  console.log('1. Generate new keys');
  console.log('2. Show my public key');
  console.log('3. Encrypt a message');
  console.log('4. Decrypt a message');
  console.log('5. Exit');
  
  rl.question('\nSelect an option: ', async (answer) => {
    switch (answer) {
      case '1':
        await setupKeys();
        break;
      case '2':
        await showPublicKey();
        break;
      case '3':
        await performEncryption();
        break;
      case '4':
        await performDecryption();
        break;
      case '5':
        rl.close();
        return;
      default:
        console.log('Invalid option');
        await mainMenu();
    }
  });
}

async function setupKeys() {
  await verifyMachine();
  
  rl.question('Enter your name: ', (name) => {
    rl.question('Enter your email: ', (email) => {
      rl.question('Enter a secure passphrase: ', async (passphrase) => {
        try {
          await generateKeys(name, email, passphrase);
        } catch (err) {
          console.error('Error generating keys:', err.message);
        }
        await mainMenu();
      });
    });
  });
}

async function showPublicKey() {
  await verifyMachine();
  
  if (!fs.existsSync(KEY_FILE)) {
    console.log('No keys found. Generate keys first.');
    await mainMenu();
    return;
  }
  
  const keys = await fs.readJSON(KEY_FILE);
  console.log('\nYour public key:');
  console.log(keys.publicKey);
  await mainMenu();
}

async function performEncryption() {
  rl.question('Enter recipient\'s public key (paste entire armored key): ', (recipientKey) => {
    rl.question('Enter message to encrypt: ', async (message) => {
      try {
        const encrypted = await encryptMessage(message, recipientKey);
        console.log('\nEncrypted message:');
        console.log(encrypted);
      } catch (err) {
        console.error('Error encrypting message:', err.message);
      }
      await mainMenu();
    });
  });
}

async function performDecryption() {
  await verifyMachine();
  
  if (!fs.existsSync(KEY_FILE)) {
    console.log('No keys found. Generate keys first.');
    await mainMenu();
    return;
  }
  
  rl.question('Enter encrypted message (paste entire armored message): ', (encryptedMessage) => {
    rl.question('Enter your passphrase: ', async (passphrase) => {
      try {
        const decrypted = await decryptMessage(encryptedMessage, passphrase);
        console.log('\nDecrypted message:');
        console.log(decrypted);
      } catch (err) {
        console.error('Error decrypting message:', err.message);
      }
      await mainMenu();
    });
  });
}

// Check if we're running the file directly
if (require.main === module) {
  // Start the CLI application
  (async () => {
    try {
      await verifyMachine();
      await mainMenu();
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  })();

  // Handle clean exit
  rl.on('close', () => {
    console.log('\nExiting Local PGP Tool. Goodbye!');
    process.exit(0);
  });
} else {
  // Export functions for use in server.js
  module.exports = {
    verifyMachine,
    generateKeys,
    encryptMessage,
    decryptMessage,
    getMachineFingerprint
  };
} 