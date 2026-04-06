import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ users: [] });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    const following = await prisma.follow.findMany({
      select: { followingId: true },
      where: { followerId: currentUser.id },
    });

    const followingIds = following.map(
      (f: { followingId: string }) => f.followingId,
    );

    const users = await prisma.user.findMany({
      select: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
        bio: true,
        id: true,
        image: true,
        name: true,
        username: true,
      },
      take: 10,
      where: {
        id: {
          not: currentUser.id,
          notIn: followingIds,
        },
        ...(q && {
          OR: [
            {
              username: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ users: [] });
  }
}
