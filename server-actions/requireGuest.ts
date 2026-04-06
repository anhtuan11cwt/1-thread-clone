"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export async function requireGuest() {
  const user = await getCurrentUser();

  if (user) {
    if (user.username) {
      redirect("/feed");
    }

    redirect("/setup-username");
  }
}
