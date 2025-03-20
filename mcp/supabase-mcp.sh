#!/bin/bash

# Supabase MCP Setup Script

echo "Starting Supabase MCP setup..."

# Define variables from environment or use defaults
SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-"https://nualpenqlmwjwwftbgft.supabase.co"}
SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:-"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51YWxwZW5xbG13and3ZnRiZ2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzY4MDYsImV4cCI6MjA1ODA1MjgwNn0.WYg65TmTz03Ww9Ha11ZcBqhdgUCpFNqFz5NeSSzfMoU"}
SUPABASE_DB_URL=${SUPABASE_DB_URL:-"postgresql://postgres.nualpenqlmwjwwftbgft:Masaokoha464@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"}

# Verify environment variables
echo "Checking Supabase configuration..."
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
  echo "Error: Supabase configuration is missing. Please check your environment variables."
  exit 1
fi

# Create SQL for user table if it doesn't exist
echo "Setting up database schema..."
cat > create_user_table.sql << EOL
-- Create users table if not exists
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  user_name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(50),
  bio TEXT,
  profile_image_url VARCHAR(255),
  clerk_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at'
  ) THEN
    CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;
EOL

# Execute the SQL script using psql
echo "Executing database setup..."
export PGPASSWORD="Masaokoha464"
psql -h aws-0-ap-northeast-1.pooler.supabase.com -U postgres.nualpenqlmwjwwftbgft -d postgres -f create_user_table.sql

# Clean up
rm create_user_table.sql

echo "Supabase MCP setup completed!" 