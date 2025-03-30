#!/bin/bash

# Ensure node_modules exists and dependencies are installed
echo "Installing dependencies..."
npm install

# Installing TypeScript globally just to be safe
echo "Installing TypeScript globally..."
npm install -g typescript

# Run the build
echo "Building the project..."
npm run build

echo "Build completed successfully!" 