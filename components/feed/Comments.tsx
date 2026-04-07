"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import Avatar from "../ui/Avatar";

interface Comment {
  author: {
    id: string;
    username: string | null;
    name: string | null;
    image: string | null;
  };
  content: string;
  createdAt: string;
  id: string;
}

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?postId=${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="py-4 text-center text-text-muted text-sm">
        Đang tải bình luận...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-4 text-center text-text-muted text-sm">
        Chưa có bình luận. Hãy là người đầu tiên bình luận!
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border">
      <h3 className="text-white font-semibold text-sm">
        Bình luận ({comments.length})
      </h3>

      {comments.map((comment) => (
        <div className="flex gap-3" key={comment.id}>
          <Avatar
            alt={comment.author.name || "avatar"}
            height={32}
            imageSrc={comment.author.image || "/images/avatar.png"}
            width={32}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm">
                {comment.author.username}
              </span>
              <span className="text-text-muted text-xs">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className="text-white/80 text-sm mt-1">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
