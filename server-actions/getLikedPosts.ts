"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";

export async function getLikedPosts() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) return [];

    const likes = await prisma.like.findMany({
      include: {
        post: {
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
        },
      },
      orderBy: { createdAt: "desc" },
      where: { userId: currentUser.id },
    });

    return likes.map((like) => ({
      ...like.post,
      createdAt: like.post.createdAt.toISOString(),
      isLiked: true,
    }));
  } catch (error) {
    console.error("GET_LIKED_POSTS_ERROR", error);
    return [];
  }
}
