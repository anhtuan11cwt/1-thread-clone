"use client";

import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { useTransition } from "react";
import { toggleLike } from "@/server-actions/toggleLike";

interface PostActionsProps {
  post: {
    id: string;
    _count: {
      likes: number;
      comments: number;
    };
    isLiked: boolean;
  };
}

export default function PostActions({ post }: PostActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      await toggleLike(post.id);
    });
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
              post.isLiked
                ? "fill-red-500 text-red-500"
                : "group-hover:fill-red-200"
            }
            size={20}
          />
        </button>
        <span className="text-sm">{post._count.likes}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          className="p-2 hover:bg-blue-50 rounded-full transition-colors"
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
