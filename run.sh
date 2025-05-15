#!/bin/bash
# Script to run ignis-pgp inside the virtual environment (Unix-based systems)

# Default command is ui if none provided
COMMAND=${1:-ui}
# Remove the first argument (command) and keep the rest
shift 1 2>/dev/null || true

# Colors for output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Activate the virtual environment
if [ -f "venv/bin/activate" ]; then
    # Save current directory
    CURRENT_DIR=$(pwd)
    
    # Activate the virtual environment
    source venv/bin/activate
    
    # Set NODE_PATH to make sure node modules are found
    export NODE_PATH="$CURRENT_DIR/node_modules"
    
    # Run the requested command
    case "$COMMAND" in
        start)
            echo -e "${CYAN}Starting CLI interface...${NC}"
            npm run start "$@"
            ;;
        ui)
            echo -e "${CYAN}Starting web UI...${NC}"
            npm run ui "$@"
            ;;
        dev)
            echo -e "${CYAN}Starting development server...${NC}"
            npm run dev "$@"
            ;;
        lint)
            echo -e "${CYAN}Running linter...${NC}"
            npm run lint "$@"
            ;;
        lint:fix)
            echo -e "${CYAN}Running linter with auto-fix...${NC}"
            npm run lint:fix "$@"
            ;;
        *)
            echo -e "${RED}Unknown command: $COMMAND${NC}"
            echo -e "${YELLOW}Available commands: start, ui, dev, lint, lint:fix${NC}"
            exit 1
            ;;
    esac
    
    # Deactivate the virtual environment
    deactivate
else
    echo -e "${RED}Virtual environment not found. Please run setup first:${NC}"
    echo -e "${YELLOW}  ./setup.sh${NC}"
    exit 1
fi 