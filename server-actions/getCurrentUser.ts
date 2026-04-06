"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = async (headers?: Headers) => {
  const session = headers
    ? await auth.api.getSession({ headers })
    : await auth.api.getSession();

  if (!session?.user) return null;

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      image: true,
      imagePublicId: true,
      username: true,
    },
    where: { id: session.user.id },
  });

  return user;
};
