#!/bin/bash

# Main setup script for CMA-HP MCP

echo "Starting MCP setup for CMA-HP..."

# Make scripts executable
chmod +x ./supabase-mcp.sh
chmod +x ./clerk-mcp.sh

# Run Supabase setup
echo "Running Supabase MCP..."
./supabase-mcp.sh
if [ $? -ne 0 ]; then
  echo "Error: Supabase MCP setup failed."
  exit 1
fi

# Run Clerk setup
echo "Running Clerk MCP..."
./clerk-mcp.sh
if [ $? -ne 0 ]; then
  echo "Error: Clerk MCP setup failed."
  exit 1
fi

# Install required dependencies
echo "Installing required dependencies..."
if ! npm list @supabase/supabase-js > /dev/null 2>&1; then
  npm install @supabase/supabase-js
fi

if ! npm list @clerk/nextjs > /dev/null 2>&1; then
  npm install @clerk/nextjs
fi

# Check if @clerk/themes is installed for dark mode support
if ! npm list @clerk/themes > /dev/null 2>&1; then
  npm install @clerk/themes
fi

echo "MCP setup completed successfully!"
echo "You can now use Supabase and Clerk in your application." 