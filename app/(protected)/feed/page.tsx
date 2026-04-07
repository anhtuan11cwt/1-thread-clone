"use client";

import Image from "next/image";
import CreatePostAction from "@/components/feed/CreatePostAction";
import CreatePostModal from "@/components/modal/CreatePostModal";
import { usePosts } from "@/hooks/usePosts";

export default function FeedPage() {
  const { data: posts, isLoading } = usePosts();

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Bảng tin
        </h1>

        <CreatePostAction />

        {isLoading && (
          <p className="text-text-muted text-center">Đang tải...</p>
        )}

        {!isLoading && posts?.length === 0 && (
          <p className="text-text-muted text-center">
            Chưa có bài đăng nào. Hãy là người đầu tiên đăng bài!
          </p>
        )}

        {posts?.map((post) => (
          <div className="border-b border-border py-4" key={post.id}>
            <div className="flex gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                <Image
                  alt={post.author.name || "avatar"}
                  className="object-cover"
                  fill
                  src={post.author.image || "/images/avatar.png"}
                />
              </div>
              <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-text-muted">@{post.author.username}</p>
              </div>
            </div>
            <p className="mt-2 text-white">{post.content}</p>
            {post.image && (
              <div className="relative mt-2 rounded-lg overflow-hidden aspect-video">
                <Image
                  alt="post"
                  className="object-cover"
                  fill
                  src={post.image}
                />
              </div>
            )}
            <div className="flex gap-4 mt-3 text-text-muted">
              <span>{post._count.likes} lượt thích</span>
              <span>{post._count.comments} bình luận</span>
            </div>
          </div>
        ))}

        <CreatePostModal />
      </div>
    </main>
  );
}
