"use client";

import CreatePostAction from "@/components/feed/CreatePostAction";
import Feed from "@/components/feed/Feed";
import CreatePostModal from "@/components/modal/CreatePostModal";

export default function FeedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Bảng tin
        </h1>

        <CreatePostAction />

        <Feed />

        <CreatePostModal />
      </div>
    </main>
  );
}
