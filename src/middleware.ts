import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { createClerkClient } from '@clerk/nextjs/server';

// 実装済みのパスを定義
// const implementedRoutes = [
//   "/",
//   "/api(.*)", 
//   "/login(.*)", 
//   "/signup(.*)",
//   "/info/terms(.*)", 
//   "/info/privacy-policy(.*)",
//   "/info/legal(.*)",
//   "/profile(.*)",
//   "/how-others-use(.*)",
//   "/use-cases(.*)",
//   "/ai-catch-up(.*)"
// ];

// パブリックルートのマッチャーを作成
// const publicRoutes = createRouteMatcher([
//   "/", 
//   "/api/webhook(.*)", 
//   "/api/auth/callback(.*)",  // 認証コールバックは公開
//   "/login", 
//   "/signup", 
//   "/about", 
//   "/contact", 
//   "/terms(.*)", 
//   "/privacy-policy(.*)",
//   "/legal(.*)",
//   "/how-others-use(.*)",
//   "/use-cases(.*)"
// ]);

// 実装済みルートのマッチャーを作成
// const implementedRoutesPattern = createRouteMatcher(implementedRoutes); // 未使用のためコメントアウト

export async function middleware(request: NextRequest) {
  console.log('[Middleware] Start processing request for:', request.nextUrl.pathname);

  // 開発環境の場合はスキップ
  if (process.env.NODE_ENV === 'development') {
    console.log('[Middleware] Development environment detected, skipping auth checks.');
    return NextResponse.next();
  }

  try {
    // ユーザー認証チェック
    console.log('[Middleware] Checking authentication status...');
    const { userId } = await getAuth(request);
    console.log('[Middleware] getAuth result - userId:', userId);

    if (!userId) {
      console.log('[Middleware] User not authenticated, redirecting to login.');
      const signInUrl = new URL('/login', request.url); // Adjust '/login' if your sign-in page is different
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }

    console.log(`[Middleware] User authenticated: ${userId}. Proceeding with email check.`);

    // メールアドレスチェック
    let isAllowedEmail = false;
    try {
      console.log(`[Middleware] Creating Clerk client for email check...`);
      const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
      console.log(`[Middleware] Fetching user data for userId: ${userId}...`);
      const user = await clerk.users.getUser(userId);
      console.log(`[Middleware] Successfully fetched user data for userId: ${userId}. User object keys:`, user ? Object.keys(user) : 'null');

      if (user && user.emailAddresses && Array.isArray(user.emailAddresses)) {
          isAllowedEmail = user.emailAddresses.some(
            (email: { emailAddress: string }) => email.emailAddress === 'masahiro.otk.55@gmail.com'
          );
          console.log(`[Middleware] Email check for userId ${userId}. Allowed: ${isAllowedEmail}`);
      } else {
        console.warn(`[Middleware] User object for userId ${userId} is missing expected emailAddresses array.`);
      }

    } catch (emailCheckError: unknown) {
      console.error(`[Middleware] Error during Clerk user fetch or email check for userId: ${userId}`, 
        emailCheckError instanceof Error ? emailCheckError.message : emailCheckError
      );
      // ここでエラーをどう扱うか？一旦エラーページかトップにリダイレクトするのが安全
      console.log('[Middleware] Redirecting to home due to email check error.');
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isAllowedEmail) {
      // 現在のパスが既に '/' でない場合のみリダイレクトする
      if (request.nextUrl.pathname !== '/') {
        console.log(`[Middleware] Email not allowed for userId ${userId}. Redirecting to /`);
        return NextResponse.redirect(new URL('/', request.url));
      } else {
        console.log(`[Middleware] Email not allowed for userId ${userId}, but already at /. Allowing access to prevent loop.`);
        // 既にホームページにいる場合はループを防ぐためにそのまま進める
      }
    }

    // パブリックルートのチェックは、認証が必要ないルートに対して行うべきだが、
    // ここまで来たら認証済みなので、基本的には次の処理に進む
    // if (publicRoutes(request)) {
    //   console.log('[Middleware] Path is public, allowing access.');
    //   return NextResponse.next();
    // }

    console.log(`[Middleware] Email check passed for userId: ${userId}. Allowing access to:`, request.nextUrl.pathname);
    return NextResponse.next();

  } catch (error: unknown) {
    console.error('[Middleware] Unhandled error during middleware execution:', 
      error instanceof Error ? error.message : error
    );
    // 未処理のエラーが発生した場合、500エラーを防ぐためにリダイレクトするなどの処理
    console.log('[Middleware] Redirecting to home due to unhandled middleware error.');
    // ここで500エラーを返す代わりに、エラーページやホームページにリダイレクトすることも検討
    // return NextResponse.redirect(new URL('/error', request.url)); // エラーページがある場合
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    // Next.jsの内部ファイルと静的ファイルをスキップ
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // APIルートは常に実行
    '/(api|trpc)(.*)',
    '/ai-catch-up/:path*',
  ],
}; 