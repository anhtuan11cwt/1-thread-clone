"use client";

import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { useState, useTransition } from "react";
import { toggleLike } from "@/server-actions/toggleLike";
import { useModalStore } from "@/store/useModalStore";
import { usePostStore } from "@/store/usePostStore";
import type { Post } from "@/types/post";

interface PostActionsProps {
  post: Post;
}

export default function PostActions({ post }: PostActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(post.isLiked);
  const [count, setCount] = useState(post._count.likes);
  const { openReplyPost } = useModalStore();
  const { setSelectedPost } = usePostStore();

  const handleLike = () => {
    if (isPending) return;

    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);

    startTransition(async () => {
      await toggleLike(post.id);
    });
  };

  const handleComment = () => {
    setSelectedPost(post);
    openReplyPost();
  };

  return (
    <div className="flex items-center justify-between mt-3 text-text-muted">
      <div className="flex items-center gap-1">
        <button
          className="p-2 hover:bg-red-50 rounded-full transition-colors group disabled:opacity-50"
          disabled={isPending}
          onClick={handleLike}
          type="button"
        >
          <Heart
            className={
              liked ? "fill-red-500 text-red-500" : "group-hover:fill-red-200"
            }
            size={20}
          />
        </button>
        <span className="text-sm">{count}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="p-2 hover:bg-blue-50 rounded-full transition-colors"
          onClick={handleComment}
          type="button"
        >
          <MessageCircle size={20} />
        </button>
        <span className="text-sm">{post._count.comments}</span>
      </div>

      <button
        className="p-2 hover:bg-green-50 rounded-full transition-colors"
        type="button"
      >
        <Repeat2 size={20} />
      </button>

      <button
        className="p-2 hover:bg-blue-50 rounded-full transition-colors"
        type="button"
      >
        <Share size={20} />
      </button>
    </div>
  );
}
