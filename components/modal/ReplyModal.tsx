"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useModalStore } from "@/store/useModalStore";
import { usePostStore } from "@/store/usePostStore";
import FeedPost from "../feed/FeedPost";
import AutoSizeTextarea from "../ui/AutoSizeTextarea";
import Avatar from "../ui/Avatar";
import PostButton from "../ui/PostButton";

export default function ReplyModal() {
  const { isReplyPostOpen, closeReplyPost } = useModalStore();
  const { selectedPost } = usePostStore();
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || !selectedPost) return;

    try {
      setLoading(true);

      const res = await fetch("/api/comments", {
        body: JSON.stringify({
          content,
          postId: selectedPost.id,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!res.ok) throw new Error();

      toast.success("Đã đăng trả lời!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      window.dispatchEvent(new Event("comment-added"));
      router.refresh();
      setContent("");
      closeReplyPost();
    } catch {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (content.trim()) {
      if (!window.confirm("Bạn có chắc muốn hủy trả lời?")) return;
    }
    closeReplyPost();
  };

  if (!isReplyPostOpen || !selectedPost) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose();
      }}
      role="dialog"
    >
      <div className="w-full max-w-xl bg-background rounded-xl p-4 space-y-4">
        <div className="flex justify-end">
          <button
            className="text-text-muted hover:text-white transition"
            onClick={handleClose}
            type="button"
          >
            ✕
          </button>
        </div>
        <FeedPost action={false} post={selectedPost} />

        <div className="flex gap-3">
          <Avatar
            height={40}
            imageSrc={session?.user?.image || "/images/avatar.png"}
            width={40}
          />

          <div className="flex-1">
            <AutoSizeTextarea
              onChange={(e) => setContent(e.target.value)}
              placeholder="Đăng trả lời của bạn..."
              value={content}
            />

            <div className="flex justify-end mt-2">
              <PostButton
                disabled={!content.trim()}
                loading={loading}
                onClick={handleSubmit}
                title="Trả lời"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
