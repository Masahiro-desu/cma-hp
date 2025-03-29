import { clerkMiddleware, createRouteMatcher, getAuth, type ClerkMiddlewareAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// createClerkClient のインポートはメールチェック削除により不要になる可能性
// import { createClerkClient } from '@clerk/nextjs/server'; 

// Define public routes accessible to everyone
const publicRoutes = createRouteMatcher([
  '/', // HomePage
  '/login(.*)', // ログイン関連
  '/signup(.*)', // サインアップ関連
  '/info/legal', // 法的情報
  '/info/privacy-policy', // プライバシーポリシー
  '/info/terms', // 利用規約
  '/api/webhooks/user' // Clerk Webhook (必要に応じて)
]);

// メールチェックが必要なルート（今回はコメントアウトするため使用しない）
/*
const needsEmailCheckRoute = createRouteMatcher([
  '/ai-catch-up(.*)'
]);
*/

export default clerkMiddleware(async (_auth: ClerkMiddlewareAuth, req: NextRequest) => { 
  const { userId } = getAuth(req);
  const url = req.nextUrl;

  console.log(`[Middleware] Simplified - Path: ${url.pathname}, UserID: ${userId}`);

  // --- 1. Handle Public Routes ---
  if (publicRoutes(req)) {
    console.log(`[Middleware] Simplified - Public route (${url.pathname}), allowing access.`);
    return NextResponse.next();
  }

  // --- 2. Handle Unauthenticated Users for Protected Routes ---
  if (!userId) {
    console.log(`[Middleware] Simplified - User not authenticated for protected route (${url.pathname}). Relying on clerkMiddleware to redirect.`);
    // Clerkがリダイレクトを処理するはずなので、NextResponse.next() を返す
    return NextResponse.next();
  }

  // --- 3. Handle Authenticated Users --- 
  console.log(`[Middleware] Simplified - User ${userId} authenticated. Allowing access to ${url.pathname}.`);

  // --- メールアドレスチェックロジックをコメントアウト ---
  /*
  if (needsEmailCheckRoute(req)) {
    // Add type guard here (userId が string であることを確認)
    if (typeof userId !== 'string') {
      console.error('[Middleware] Error: userId is not a string when starting email check. Redirecting to login.');
      return NextResponse.redirect(new URL('/login', req.url)); 
    }
    
    console.log(`[Middleware] Route ${url.pathname} requires email check for user ${userId}.`);
    console.log(`[Middleware] CLERK_SECRET_KEY presence check: ${!!process.env.CLERK_SECRET_KEY}`);
    let isAllowedEmail = false;
    try {
      if (!process.env.CLERK_SECRET_KEY) {
        throw new Error("CLERK_SECRET_KEY environment variable is not set.");
      }
      // createClerkClient のインポートが必要
      const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
      console.log(`[Middleware] Attempting to get user data for ${userId}...`);
      // getUser の引数で非 null アサーション (!) を使用してビルドエラーを回避
      const user = await clerk.users.getUser(userId!); 
      console.log(`[Middleware] Successfully got user data for ${userId}.`);
      if (user && user.emailAddresses && Array.isArray(user.emailAddresses)) {
        isAllowedEmail = user.emailAddresses.some(
          (email) => email.emailAddress === 'masahiro.otk.55@gmail.com'
        );
        console.log(`[Middleware] Email check for ${userId} on ${url.pathname}. Allowed: ${isAllowedEmail}`);
      } else {
        console.warn(`[Middleware] User ${userId} missing email addresses or unexpected user object structure.`);
      }
    } catch (error: unknown) {
      console.error(`[Middleware] Error during email check/getUser for ${userId}:`, error instanceof Error ? error.message : String(error));
      // Redirect to home on error during email check
      if (url.pathname !== '/') {
        return NextResponse.redirect(new URL('/', req.url));
      }
      // If already at home, allow to prevent loop
      return NextResponse.next(); 
    }

    if (!isAllowedEmail) {
      console.log(`[Middleware] User ${userId} does not have allowed email for ${url.pathname}. Redirecting to home.`);
      // Redirect to a 'not authorized' page or home page
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to home
    }

    console.log(`[Middleware] User ${userId} has allowed email for ${url.pathname}. Allowing access.`);
  }
  */
  // --- ここまでコメントアウト ---

  // 認証済みで、特別なチェックがない場合はアクセスを許可
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files including image optimization files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).)*',
    // Match specific routes if needed, e.g. API routes
    // '/api/:path*',
  ],
}; 