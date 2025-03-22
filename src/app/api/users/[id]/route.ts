import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  _request: NextRequest,
  { params, searchParams }: { params: { id: string }; searchParams?: { [key: string]: string | string[] } }
): Promise<NextResponse> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    // paramsからユーザーIDを取得
    const { id } = params;

    // ユーザー情報を取得（管理者向けAPI）
    // 本番環境では適切な権限チェックを追加すること
    const user = await prisma.user_db.findUnique({
      where: { user_id: id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // 機密情報を除外して返却
    const safeUser = Object.fromEntries(
      Object.entries(user).filter(([key]) => key !== "password_hash")
    );

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}