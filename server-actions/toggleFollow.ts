"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function toggleFollow(userId: string) {
  try {
    const headersList = await import("next/headers").then((m) => m.headers());
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user) {
      return { error: "Chưa đăng nhập" };
    }

    const currentUserId = session.user.id;

    if (currentUserId === userId) {
      return { error: "Không thể theo dõi chính mình" };
    }

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: userId,
        },
      },
    });

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: userId,
          },
        },
      });
      revalidatePath(`/${userId}`);
      return { isFollowing: false, success: true };
    }
    await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    revalidatePath(`/${userId}`);
    return { isFollowing: true, success: true };
  } catch (error) {
    console.error(error);
    return { error: "Đã xảy ra lỗi" };
  }
}
