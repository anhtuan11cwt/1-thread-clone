import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Comments from "@/components/feed/Comments";
import PostActions from "@/components/feed/PostActions";
import Avatar from "@/components/ui/Avatar";
import moment from "@/lib/moment";
import { getPostById } from "@/server-actions/getPostById";
import type { Post } from "@/types/post";

interface PostLoaderProps {
  postId: string;
}

export default async function PostLoader({ postId }: PostLoaderProps) {
  const post = await getPostById(postId);

  if (!post) {
    return (
      <div className="p-4 text-center text-text-muted">
        <p>Không tìm thấy bài viết</p>
      </div>
    );
  }

  return (
    <div className="border-b border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            alt={post.author.name || "avatar"}
            height={40}
            imageSrc={post.author.image || "/images/avatar.png"}
            width={40}
          />
          <Link
            className="text-white font-semibold text-sm hover:underline"
            href={`/${post.author.username}`}
          >
            {post.author.username}
          </Link>
          <span className="text-text-muted text-sm">
            {moment(post.createdAt).fromNow()}
          </span>
        </div>
        <MoreHorizontal className="text-text-muted cursor-pointer" size={18} />
      </div>

      <div className="space-y-3">
        {post.content && (
          <p className="text-white/80 text-sm leading-relaxed">
            {post.content}
          </p>
        )}

        {post.image && (
          <div className="relative w-full rounded-xl overflow-hidden">
            <Image
              alt="Hình ảnh bài viết"
              className="object-contain w-full h-auto"
              height={600}
              src={post.image}
              width={600}
            />
          </div>
        )}
      </div>

      <PostActions post={post as unknown as Post} />

      <Comments postId={post.id} />
    </div>
  );
}
