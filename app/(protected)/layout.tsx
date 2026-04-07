import type { ReactNode } from "react";
import MobileMenu from "@/components/general/MobileMenu";
import Sidebar from "@/components/general/Sidebar";
import ProfileModal from "@/components/modal/ProfileModal";
import ReplyModal from "@/components/modal/ReplyModal";
import QueryProvider from "@/providers/QueryProvider";
import { getCurrentUserProfile } from "@/server-actions/getCurrentUserProfile";
import { requireAuth } from "@/server-actions/requireAuth";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();
  const userProfile = await getCurrentUserProfile();

  return (
    <QueryProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 pb-16 md:pb-0">{children}</main>
        <MobileMenu />
        {userProfile && <ProfileModal userProfile={userProfile} />}
        <ReplyModal />
      </div>
    </QueryProvider>
  );
}
