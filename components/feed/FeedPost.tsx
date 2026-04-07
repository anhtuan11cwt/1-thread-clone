import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import moment from "@/lib/moment";
import type { Post } from "@/types/post";
import Avatar from "../ui/Avatar";
import PostActions from "./PostActions";

interface FeedPostProps {
  action?: boolean;
  post: Post;
}

export default function FeedPost({ post, action = true }: FeedPostProps) {
  return (
    <div className="border border-border rounded-xl p-4 bg-surface">
      <div className="flex items-start gap-3">
        <Link href={`/${post.author?.username}`}>
          <Avatar
            alt={post.author?.name || ""}
            imageSrc={post.author?.image || "/images/avatar.png"}
          />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link
              className="font-semibold text-white hover:underline"
              href={`/${post.author?.username}`}
            >
              {post.author?.name}
            </Link>
            <span className="text-text-muted text-sm">
              @{post.author?.username}
            </span>
            <span className="text-text-muted text-sm">
              · {moment(post.createdAt).fromNow()}
            </span>
          </div>

          <Link className="block mt-2" href={`/feed/${post.id}`}>
            {post.content && <p className="text-white">{post.content}</p>}

            {post.image && (
              <div className="relative mt-3 rounded-xl overflow-hidden aspect-video">
                <Image
                  alt="Nội dung bài đăng"
                  className="object-cover"
                  fill
                  src={post.image}
                />
              </div>
            )}
          </Link>

          {action && <PostActions post={post} />}
        </div>

        <button className="text-text-muted hover:text-text p-1" type="button">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
