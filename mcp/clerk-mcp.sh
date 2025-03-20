#!/bin/bash

# Clerk MCP Setup Script

echo "Starting Clerk MCP setup..."

# Define variables from environment or use defaults
CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:-"pk_test_aGFyZHkta2FuZ2Fyb28tMzkuY2xlcmsuYWNjb3VudHMuZGV2JA"}
CLERK_SECRET_KEY=${CLERK_SECRET_KEY:-"sk_test_LLD1twfs4ARMTOhUroA2nSCywrSzxeC2utasnEfWm0"}

# Verify environment variables
echo "Checking Clerk configuration..."
if [ -z "$CLERK_PUBLISHABLE_KEY" ] || [ -z "$CLERK_SECRET_KEY" ]; then
  echo "Error: Clerk configuration is missing. Please check your environment variables."
  exit 1
fi

# Check if middleware.ts exists and create if it doesn't
if [ ! -f "src/middleware.ts" ]; then
  echo "Creating middleware.ts for Clerk authentication..."
  
  mkdir -p src
  
  cat > src/middleware.ts << EOL
import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: ["/", "/api/webhook", "/api(.*)"],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
EOL

  echo "Created middleware.ts"
fi

# Check if Clerk context provider exists and create if it doesn't
if [ ! -f "src/components/providers/clerk-provider.tsx" ]; then
  echo "Creating Clerk provider component..."
  
  mkdir -p src/components/providers
  
  cat > src/components/providers/clerk-provider.tsx << EOL
'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export function ClerkAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const clerkTheme = theme === 'dark' ? dark : undefined;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkTheme,
        elements: {
          formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
          card: 'bg-background',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
EOL

  echo "Created Clerk provider component"
fi

echo "Clerk MCP setup completed!" 