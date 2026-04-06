import type { ReactNode } from "react";
import { requireAuth } from "@/server-actions/requireAuth";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return <>{children}</>;
}
