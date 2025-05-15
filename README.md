# Ignis PGP - Machine-Locked Encryption Tool

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
- Python 3.8 or higher (for virtual environment)

## Installation

### Quick Setup (Recommended)

We provide setup scripts that create a virtual environment and install all dependencies:

For Windows:
```powershell
# Clone the repository
git clone https://github.com/Ignis-AI-Labs/ignis-pgp.git
cd ignis-pgp

# Run the setup script
.\setup.ps1
```

For Unix-based systems (Linux, macOS):
```bash
# Clone the repository
git clone https://github.com/Ignis-AI-Labs/ignis-pgp.git
cd ignis-pgp

# Run the setup script
./setup.sh
```

### Manual Setup

If you prefer to set up manually:

```bash
# Clone the repository
git clone https://github.com/Ignis-AI-Labs/ignis-pgp.git
cd ignis-pgp

# Install dependencies
npm install
```

## Usage

### With Virtual Environment (Recommended)

After setting up, run the tool using the provided run scripts:

For Windows:
```powershell
.\run.ps1 ui    # Start the web UI
.\run.ps1 start # Start the CLI
.\run.ps1 dev   # Start the development server with auto-reload
```

For Unix-based systems:
```bash
./run.sh ui     # Start the web UI
./run.sh start  # Start the CLI
./run.sh dev    # Start the development server with auto-reload
```

### Without Virtual Environment

If you've installed dependencies manually:

```bash
# Start the web UI
npm run ui

# Start the command-line interface
npm run start
```

### Web Interface

The web interface runs at http://localhost:3000 and provides an intuitive way to:
- Generate and manage your keys
- Encrypt messages for others
- Decrypt messages sent to you
- View information about the tool

### First-time Setup

1. Generate your keys by completing the form
2. Enter your name, email, and a secure passphrase
3. Your public key will be displayed - you can share this with others who want to send you encrypted messages

### Encrypting Messages

1. Switch to the "Encrypt" tab
2. Paste the recipient's public key
3. Enter the message you want to encrypt
4. Click "Encrypt Message"
5. Copy the encrypted message and send it to your recipient

### Decrypting Messages

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

## Development

For those interested in contributing to the project, please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines and development setup instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 