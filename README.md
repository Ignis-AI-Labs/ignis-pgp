# Machine-Locked PGP Tool

A simple PGP encryption/decryption tool that is locked to the specific computer it's generated on. This tool ensures that encrypted messages can only be decrypted on the original machine.

## Features

- Generate PGP key pairs (4096-bit RSA)
- Hardware-locked private keys that only work on the original computer
- Encrypt messages for recipients using their public key
- Decrypt messages sent to you (only works on the original computer)
- Modern, user-friendly web interface
- Command-line interface for advanced users

## Security Features

- Private keys are locked to the specific hardware configuration
- Machine fingerprinting uses multiple hardware identifiers
- Private keys are encrypted with your passphrase
- 4096-bit RSA encryption for strong security

## Requirements

- Node.js 12.0.0 or higher
- npm (Node Package Manager)

## Installation

1. Clone this repository:
   ```
   git clone [repository-url]
   cd pgp
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

### Web Interface (Recommended)

Run the web UI with:

```
npm run ui
```

Then open your browser to http://localhost:3000

The web interface provides an intuitive way to:
- Generate and manage your keys
- Encrypt messages for others
- Decrypt messages sent to you
- View information about the tool

### Command Line Interface

If you prefer a command-line interface:

```
npm start
```

### First-time setup

1. Generate your keys by completing the form
2. Enter your name, email, and a secure passphrase
3. Your public key will be displayed - you can share this with others who want to send you encrypted messages

### Encrypting messages

1. Switch to the "Encrypt" tab
2. Paste the recipient's public key
3. Enter the message you want to encrypt
4. Click "Encrypt Message"
5. Copy the encrypted message and send it to your recipient

### Decrypting messages

1. Switch to the "Decrypt" tab
2. Paste the encrypted message
3. Enter your passphrase
4. Click "Decrypt Message"
5. The decrypted message will be displayed

## Important Notes

- **This tool is hardware-locked** - if you try to use it on a different computer, decryption will fail
- **Keep your passphrase safe** - if you forget it, you won't be able to decrypt messages
- Keys are stored in a hidden directory in your user profile
- Always verify you're sending to the right recipient by confirming public keys

## How Hardware Locking Works

The tool creates a unique fingerprint of your computer using:
- Machine ID (hardware identifier)
- Operating system details
- Computer hostname
- User account details

This fingerprint is stored and verified each time you decrypt a message, ensuring only the original computer can decrypt messages. 