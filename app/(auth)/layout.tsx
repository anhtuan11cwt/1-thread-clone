import type { ReactNode } from "react";
import { requireGuest } from "@/server-actions/requireGuest";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireGuest();

  return <>{children}</>;
}
