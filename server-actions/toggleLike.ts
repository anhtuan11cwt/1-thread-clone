"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function toggleLike(postId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Chưa được ủy quyền");
  }

  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId: session.user.id,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        userId_postId: {
          postId,
          userId: session.user.id,
        },
      },
    });
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });
  }

  revalidatePath("/");
}
