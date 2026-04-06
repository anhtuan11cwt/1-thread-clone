"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.username) {
    redirect("/setup-username");
  }

  return user;
}
