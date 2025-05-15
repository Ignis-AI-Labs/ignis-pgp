# Setup script for Windows using PowerShell
# Creates a virtual environment and installs dependencies

# Exit on error
$ErrorActionPreference = "Stop"

Write-Host "Setting up ignis-pgp virtual environment..." -ForegroundColor Cyan

# Check if Python is installed
try {
    python --version
} catch {
    Write-Host "Python is not installed or not in PATH. Please install Python 3.8 or higher." -ForegroundColor Red
    exit 1
}

# Create venv directory if it doesn't exist
if (!(Test-Path -Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
} else {
    Write-Host "Virtual environment already exists." -ForegroundColor Yellow
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Install node dependencies
Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
npm install

# Create activation script
$activateScript = @"
# This file activates the virtual environment and sets up the proper path
& `$PSScriptRoot\venv\Scripts\Activate.ps1

# Export environment variables if needed
`$env:NODE_PATH = "`$PSScriptRoot\node_modules"
"@

Set-Content -Path "activate.ps1" -Value $activateScript

Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host "To activate the environment, run: .\activate.ps1" -ForegroundColor Cyan
Write-Host "To start the UI, run: npm run ui" -ForegroundColor Cyan 