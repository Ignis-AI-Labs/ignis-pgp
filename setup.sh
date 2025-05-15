#!/bin/bash
# Setup script for Unix-based systems (Linux, macOS)
# Creates a virtual environment and installs dependencies

# Exit on error
set -e

echo -e "\033[1;36mSetting up ignis-pgp virtual environment...\033[0m"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "\033[1;31mPython 3 is not installed or not in PATH. Please install Python 3.8 or higher.\033[0m"
    exit 1
fi

# Create venv directory if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "\033[1;33mCreating virtual environment...\033[0m"
    python3 -m venv venv
else
    echo -e "\033[1;33mVirtual environment already exists.\033[0m"
fi

# Activate virtual environment
echo -e "\033[1;33mActivating virtual environment...\033[0m"
source venv/bin/activate

# Install node dependencies
echo -e "\033[1;33mInstalling Node.js dependencies...\033[0m"
npm install

# Create activation script
cat > activate.sh << EOL
#!/bin/bash
# This file activates the virtual environment and sets up the proper path
source "\$(dirname "\$0")/venv/bin/activate"

# Export environment variables if needed
export NODE_PATH="\$(dirname "\$0")/node_modules"

echo -e "\033[1;32mVirtual environment activated!\033[0m"
EOL

# Make activation script executable
chmod +x activate.sh

echo -e "\033[1;32mSetup completed successfully!\033[0m"
echo -e "\033[1;36mTo activate the environment, run: source ./activate.sh\033[0m"
echo -e "\033[1;36mTo start the UI, run: npm run ui\033[0m" 