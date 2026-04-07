import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/services/cloudinary";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        author: {
          select: {
            id: true,
            image: true,
            name: true,
            username: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Lỗi khi lấy bài đăng:", error);
    return NextResponse.json({ error: "Lỗi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const formData = await req.formData();

    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    if (!content && !image) {
      return NextResponse.json(
        { error: "Bài đăng không thể để trống" },
        { status: 400 },
      );
    }

    let imageUrl = null;

    if (image) {
      const result = await uploadToCloudinary(image, "posts");
      imageUrl = result.secure_url;
    }

    const post = await prisma.post.create({
      data: {
        authorId: session.user.id,
        content,
        image: imageUrl,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
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

    return NextResponse.json(post);
  } catch (error) {
    console.error("Lỗi khi tạo bài đăng:", error);
    return NextResponse.json({ error: "Lỗi" }, { status: 500 });
  }
}
