import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// パブリックルートのマッチャーを作成
const publicRoutes = createRouteMatcher([
  "/", 
  "/api/webhook(.*)", 
  "/api(.*)", 
  "/login", 
  "/signup", 
  "/about", 
  "/contact", 
  "/terms", 
  "/privacy"
]);

export default clerkMiddleware(async (auth, req) => {
  if (publicRoutes(req)) {
    return; // パブリックルートはそのまま通す
  }
  
  // 認証が必要なルートを保護
  await auth.protect();
});

export const config = {
  matcher: [
    // Next.jsの内部ファイルと静的ファイルをスキップ
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // APIルートは常に実行
    '/(api|trpc)(.*)',
  ],
}; 