# Contributing to Ignis PGP

Thank you for your interest in contributing to Ignis PGP! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Setting Up Development Environment](#setting-up-development-environment)
  - [Development Workflow](#development-workflow)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Style Guidelines](#style-guidelines)
  - [Code Style](#code-style)
  - [Commit Messages](#commit-messages)
- [Security Considerations](#security-considerations)

## Code of Conduct

This project adheres to a Code of Conduct that expects all participants to respect each other and create a positive environment. By participating, you are expected to uphold this code.

## Getting Started

### Setting Up Development Environment

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ignis-AI-Labs/ignis-pgp.git
   cd ignis-pgp
   ```

2. **Set up the development environment**:

   For Windows:
   ```powershell
   .\setup.ps1
   ```

   For Unix-based systems (Linux, macOS):
   ```bash
   ./setup.sh
   ```

   This creates a virtual environment, installs dependencies, and sets up activation scripts.

3. **Run the application**:

   For Windows:
   ```powershell
   .\run.ps1 ui    # For the web UI
   .\run.ps1 start # For the CLI
   .\run.ps1 dev   # For development mode with auto-restart
   ```

   For Unix-based systems:
   ```bash
   ./run.sh ui     # For the web UI
   ./run.sh start  # For the CLI
   ./run.sh dev    # For development mode with auto-restart
   ```

### Development Workflow

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Run linting to ensure code quality: `.\run.ps1 lint` or `./run.sh lint`
4. Test your changes thoroughly
5. Submit a pull request

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue using the bug report template. Include:

- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, Node.js version, etc.)

### Suggesting Enhancements

For feature requests, create an issue using the enhancement template. Include:

- A clear, descriptive title
- Detailed description of the proposed feature
- Rationale: why this would be useful
- Potential implementation details if you have them

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** and ensure the code follows our style guidelines
3. **Write tests** for your changes if applicable
4. **Update documentation** to reflect your changes
5. **Submit a pull request** with a clear description of the changes

Pull requests should:
- Have a clear, descriptive title
- Describe the problem and solution
- Include any relevant issue numbers
- Update documentation as needed

## Style Guidelines

### Code Style

This project uses ESLint to enforce consistent code style. Please follow these principles:

- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for classes
- Add appropriate JSDoc comments for functions and complex logic
- Keep functions small and focused on a single responsibility
- Use meaningful variable names

Run the linter before submitting:
```
.\run.ps1 lint     # Check code style
.\run.ps1 lint:fix # Fix automatically fixable issues
```

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line
- Consider using the conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for tests
  - `chore:` for maintenance tasks

## Security Considerations

As Ignis PGP deals with encryption and security:

1. **Never** commit sensitive data (private keys, passwords)
2. **Always** review code for potential security vulnerabilities
3. Report security vulnerabilities privately to the maintainers
4. Be extremely careful when modifying encryption/decryption logic
5. Document security implications of your changes
6. Consider the threat model and potential attack vectors

Thank you for contributing to Ignis PGP! 