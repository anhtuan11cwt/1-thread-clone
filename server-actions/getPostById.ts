"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getPostById(id: string) {
  try {
    const currentUser = await getCurrentUser();
    const currentUserId = currentUser?.id;

    const post = await prisma.post.findUnique({
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
        comments: {
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
        },
        likes: true,
      },
      where: {
        id: id,
      },
    });

    if (!post) {
      return null;
    }

    const isLiked = currentUserId
      ? post.likes.some((like) => like.userId === currentUserId)
      : false;

    return { ...post, isLiked };
  } catch (error) {
    console.error("Get post error:", error);
    return null;
  }
}
