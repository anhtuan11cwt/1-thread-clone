import type { ReactNode } from "react";
import MobileMenu from "@/components/general/MobileMenu";
import Sidebar from "@/components/general/Sidebar";
import { requireAuth } from "@/server-actions/requireAuth";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-16 md:pb-0">{children}</main>
      <MobileMenu />
    </div>
  );
}
