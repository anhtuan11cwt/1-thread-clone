"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUserProfileByUsername(username: string) {
  try {
    const headersList = await import("next/headers").then((m) => m.headers());
    const session = await auth.api.getSession({
      headers: headersList,
    });

    const currentUserId = session?.user?.id;

    const user = await prisma.user.findUnique({
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
      where: { username },
    });

    if (!user) return null;

    let isFollowing = false;

    if (currentUserId && currentUserId !== user.id) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: user.id,
          },
        },
      });

      isFollowing = !!follow;
    }

    return {
      _count: user._count,
      bio: user.bio,
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      image: user.image,
      isFollowing,
      name: user.name,
      username: user.username,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
