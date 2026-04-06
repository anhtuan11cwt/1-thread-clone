"use server";

import { prisma } from "@/lib/prisma";
import type { User } from "@/types/user";
import { requireAuth } from "./requireAuth";

export const getCurrentUserProfile = async () => {
  const user = await requireAuth();

  const profile = await prisma.user.findUnique({
    select: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
      bio: true,
      createdAt: true,
      email: true,
      id: true,
      image: true,
      name: true,
      username: true,
    },
    where: {
      id: user.id,
    },
  });

  return profile as User | null;
};
