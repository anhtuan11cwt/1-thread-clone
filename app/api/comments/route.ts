import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Cần có ID bài viết" },
        { status: 400 },
      );
    }

    const comments = await prisma.comment.findMany({
      include: {
        author: {
          select: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        postId,
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET_COMMENTS_ERROR:", error);
    return NextResponse.json(
      { error: "Lấy bình luận thất bại" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const body = await req.json();
    const { postId, content } = body;

    if (!postId || !content) {
      return NextResponse.json(
        { error: "Cần có ID bài viết và nội dung" },
        { status: 400 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        authorId: session.user.id,
        content,
        postId,
      },
      include: {
        author: {
          select: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("CREATE_COMMENT_ERROR:", error);
    return NextResponse.json(
      { error: "Tạo bình luận thất bại" },
      { status: 500 },
    );
  }
}
