import { createRouteMatcher } from '@clerk/nextjs/server';
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
const publicRoutes = createRouteMatcher([
  "/", 
  "/api/webhook(.*)", 
  "/api/auth/callback(.*)",  // 認証コールバックは公開
  "/login", 
  "/signup", 
  "/about", 
  "/contact", 
  "/terms(.*)", 
  "/privacy-policy(.*)",
  "/legal(.*)",
  "/how-others-use(.*)",
  "/use-cases(.*)"
]);

// 実装済みルートのマッチャーを作成
// const implementedRoutesPattern = createRouteMatcher(implementedRoutes); // 未使用のためコメントアウト

export async function middleware(request: NextRequest) {
  // 開発環境の場合はスキップ
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // ユーザー認証チェック
  const { userId } = await getAuth(request);
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // メールアドレスチェック
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  const user = await clerk.users.getUser(userId);
  const isAllowedEmail = user.emailAddresses.some(
    (email: { emailAddress: string }) => email.emailAddress === 'masahiro.otk.55@gmail.com'
  );

  if (!isAllowedEmail) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // パブリックルートの場合はスキップ
  if (publicRoutes(request)) {
    return NextResponse.next();
  }

  return NextResponse.next();
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