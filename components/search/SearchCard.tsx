import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

interface Props {
  user: {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    image: string | null;
    _count: {
      followers: number;
      following: number;
      posts: number;
    };
  };
}

export default function SearchCard({ user }: Props) {
  return (
    <Link
      className="flex gap-3 p-3 rounded-xl hover:bg-zinc-900/50 transition"
      href={`/${user.username}`}
    >
      <Avatar height={48} imageSrc={user.image} width={48} />

      <div className="flex-1">
        <p className="text-white font-semibold">@{user.username}</p>
        <p className="text-sm text-gray-400">{user.name}</p>

        {user.bio && (
          <p className="text-sm text-gray-500 line-clamp-2">{user.bio}</p>
        )}

        <div className="flex gap-4 text-xs text-gray-400 mt-1">
          <span>{user._count.followers} người theo dõi</span>
          <span>{user._count.following} đang theo dõi</span>
          <span>{user._count.posts} bài viết</span>
        </div>
      </div>
    </Link>
  );
}
