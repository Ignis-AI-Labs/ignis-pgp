const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const openpgp = require('openpgp');
const machineId = require('node-machine-id');

// Import PGP functions from index.js
const pgpCore = require('./index');

const app = express();
const PORT = 3000;

// Set up template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Check if keys exist
app.get('/api/keys/status', async (req, res) => {
  try {
    const keyFile = path.join(process.env.APPDATA || process.env.HOME, '.local-pgp', 'pgp-keys.json');
    const exists = await fs.exists(keyFile);
    
    if (exists) {
      const keys = await fs.readJSON(keyFile);
      res.json({ exists: true, publicKey: keys.publicKey });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate keys
app.post('/api/keys/generate', async (req, res) => {
  try {
    const { name, email, passphrase } = req.body;
    
    if (!name || !email || !passphrase) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Verify machine
    await pgpCore.verifyMachine();
    
    const keys = await pgpCore.generateKeys(name, email, passphrase);
    res.json({ success: true, publicKey: keys.publicKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Encrypt message
app.post('/api/encrypt', async (req, res) => {
  try {
    const { message, recipientPublicKey } = req.body;
    
    if (!message || !recipientPublicKey) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const encrypted = await pgpCore.encryptMessage(message, recipientPublicKey);
    res.json({ success: true, encryptedMessage: encrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Decrypt message
app.post('/api/decrypt', async (req, res) => {
  try {
    const { encryptedMessage, passphrase } = req.body;
    
    if (!encryptedMessage || !passphrase) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Verify machine first
    await pgpCore.verifyMachine();
    
    const decrypted = await pgpCore.decryptMessage(encryptedMessage, passphrase);
    res.json({ success: true, decryptedMessage: decrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`PGP UI server running at http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to quit`);
}); 