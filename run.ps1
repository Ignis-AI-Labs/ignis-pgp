# Script to run ignis-pgp inside the virtual environment (Windows)

# Get the command line arguments
param (
    [Parameter(Position=0)]
    [string]$Command = "ui",
    
    [Parameter(ValueFromRemainingArguments=$true)]
    $RemainingArgs
)

# Activate the virtual environment
if (Test-Path -Path "venv\Scripts\Activate.ps1") {
    # Save current directory
    $CurrentDir = Get-Location
    
    # Activate the virtual environment
    . .\venv\Scripts\Activate.ps1
    
    # Set NODE_PATH to make sure node modules are found
    $env:NODE_PATH = Join-Path -Path $CurrentDir -ChildPath "node_modules"
    
    try {
        switch ($Command) {
            "start" {
                Write-Host "Starting CLI interface..." -ForegroundColor Cyan
                npm run start $RemainingArgs
            }
            "ui" {
                Write-Host "Starting web UI..." -ForegroundColor Cyan
                npm run ui $RemainingArgs
            }
            "dev" {
                Write-Host "Starting development server..." -ForegroundColor Cyan
                npm run dev $RemainingArgs
            }
            "lint" {
                Write-Host "Running linter..." -ForegroundColor Cyan
                npm run lint $RemainingArgs
            }
            "lint:fix" {
                Write-Host "Running linter with auto-fix..." -ForegroundColor Cyan
                npm run lint:fix $RemainingArgs
            }
            default {
                Write-Host "Unknown command: $Command" -ForegroundColor Red
                Write-Host "Available commands: start, ui, dev, lint, lint:fix" -ForegroundColor Yellow
                exit 1
            }
        }
    }
    finally {
        # Deactivate the virtual environment (not strictly needed, but good practice)
        deactivate
    }
} else {
    Write-Host "Virtual environment not found. Please run setup first:" -ForegroundColor Red
    Write-Host "  .\setup.ps1" -ForegroundColor Yellow
    exit 1
} 