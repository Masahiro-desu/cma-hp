import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClerkClient } from '@clerk/nextjs/server';

// Define routes that require authentication but have specific authorization rules
const needsEmailCheckRoute = createRouteMatcher([
  '/ai-catch-up(.*)', // Only specific emails can access this
]);

// Define public routes accessible to everyone
const publicRoutes = createRouteMatcher([
  '/', // Homepage is public
  '/login(.*)', // Login/Signup pages
  '/signup(.*)',
  '/info/(.*)', // Info pages (terms, privacy, legal)
  '/how-others-use(.*)', // Assuming these are public
  '/use-cases(.*)', // Assuming these are public
  '/api/webhook(.*)', // Webhooks are typically public
  // Add any other public API routes or pages here
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = auth();
  const url = req.nextUrl;

  console.log(`[Middleware] Path: ${url.pathname}, UserID: ${userId}`);

  // --- 1. Handle Public Routes --- 
  if (publicRoutes(req)) {
    console.log(`[Middleware] Public route (${url.pathname}), allowing access.`);
    return NextResponse.next(); // Allow access to public routes
  }

  // --- 2. Handle Unauthenticated Users for Protected Routes --- 
  if (!userId) {
    // clerkMiddleware automatically redirects to login for non-public routes
    // if the user is not authenticated. Logging here for clarity.
    console.log(`[Middleware] User not authenticated for protected route (${url.pathname}). Redirecting via clerkMiddleware.`);
    // No explicit redirect needed here, clerkMiddleware handles it.
    // You might want to ensure your Clerk Frontend API keys and sign-in URL are set correctly in env.
    return auth().redirectToSignIn(); // Explicit redirect for clarity, though Clerk might handle it
  }

  // --- 3. Handle Authenticated Users --- 
  console.log(`[Middleware] User ${userId} authenticated. Checking specific route rules.`);

  // --- 3a. Special Check for /ai-catch-up --- 
  if (needsEmailCheckRoute(req)) {
    console.log(`[Middleware] Route ${url.pathname} requires email check for user ${userId}.`);
    let isAllowedEmail = false;
    try {
      const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
      const user = await clerk.users.getUser(userId);
      if (user && user.emailAddresses && Array.isArray(user.emailAddresses)) {
        isAllowedEmail = user.emailAddresses.some(
          (email) => email.emailAddress === 'masahiro.otk.55@gmail.com'
        );
        console.log(`[Middleware] Email check for ${userId} on ${url.pathname}. Allowed: ${isAllowedEmail}`);
      } else {
        console.warn(`[Middleware] User ${userId} missing email addresses.`);
      }
    } catch (error: unknown) {
      console.error(`[Middleware] Error during email check for ${userId}:`, error instanceof Error ? error.message : error);
      // Redirect to home on error during email check
      if (url.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
      }
      // If already at home, allow to prevent loop
      return NextResponse.next(); 
    }

    if (!isAllowedEmail) {
      console.log(`[Middleware] Email not allowed for ${userId} on ${url.pathname}. Redirecting to /.`);
      // Redirect to home if email is not allowed, avoiding loop if already at home
      if (url.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
      }
       // If already at home, allow to prevent loop
       return NextResponse.next(); 
    }
    // If email is allowed, fall through to allow access
    console.log(`[Middleware] Email allowed for ${userId} on ${url.pathname}. Allowing access.`);
  }

  // --- 3b. Default Allow for Authenticated Users on other protected routes --- 
  console.log(`[Middleware] Allowing authenticated user ${userId} access to ${url.pathname}.`);
  return NextResponse.next(); // Allow access to all other authenticated routes
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!.+\\.[\\w]+$|_next).*)', 
    // Run on specific routes 
    '/', // Match homepage
    '/(api|trpc)(.*)', // Match API routes
    '/ai-catch-up(.*)', // Match the specific protected route
    '/info/(.*)', // Match info pages (to potentially handle future auth needs)
    '/login(.*)', // Match login/signup pages
    '/signup(.*)',
    // Add other routes you want the middleware to run on
  ],
}; 