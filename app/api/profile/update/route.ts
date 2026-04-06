import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/services/cloudinary";

export async function PATCH(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Chưa xác thực" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as File | null;

    if (!name || !username) {
      return NextResponse.json(
        { error: "Name và username là bắt buộc" },
        { status: 400 },
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "Không tìm thấy người dùng" },
        { status: 404 },
      );
    }

    if (username !== currentUser.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser) {
        return NextResponse.json(
          { error: "Username đã tồn tại" },
          { status: 400 },
        );
      }
    }

    let imageUrl = currentUser.image;
    let imagePublicId = currentUser.imagePublicId;

    if (image && image.size > 0) {
      const uploadResult = await uploadToCloudinary(image, "avatars");
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;

      if (currentUser.imagePublicId) {
        try {
          await deleteFromCloudinary(currentUser.imagePublicId);
        } catch (error) {
          console.error("Lỗi khi xóa ảnh cũ:", error);
        }
      }
    }

    const updatedUser = await prisma.user.update({
      data: {
        bio,
        image: imageUrl,
        imagePublicId,
        name,
        username,
      },
      where: { id: session.user.id },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
