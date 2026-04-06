import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const headers = req.headers;
    const user = await getCurrentUser(headers);

    if (!user) {
      return NextResponse.json({ error: "Không được phép" }, { status: 401 });
    }

    const { username } = await req.json();

    if (!username || username.length < 3) {
      return NextResponse.json(
        { error: "Username không hợp lệ" },
        { status: 400 },
      );
    }

    const formatted = username.toLowerCase().trim();

    const existing = await prisma.user.findUnique({
      where: { username: formatted },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Username đã tồn tại" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      data: { username: formatted },
      where: { id: user.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Setup username error:", error);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
