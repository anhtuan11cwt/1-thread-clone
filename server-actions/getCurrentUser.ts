"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = async () => {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

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
