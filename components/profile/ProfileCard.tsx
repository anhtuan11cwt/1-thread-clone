"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Avatar from "@/components/ui/Avatar";
import { toggleFollow } from "@/server-actions/toggleFollow";
import { useModalStore } from "@/store/useModalStore";
import type { User } from "@/types/user";

interface ProfileCardProps {
  isCurrentUser?: boolean;
  user: User;
}

const ProfileCard = ({ user, isCurrentUser = true }: ProfileCardProps) => {
  const { openEditProfile } = useModalStore();
  const [isFollowing, setIsFollowing] = useState(user.isFollowing ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      const result = await toggleFollow(user.id);

      if (result.error) {
        toast.error(result.error);
      } else {
        setIsFollowing(result.isFollowing ?? !isFollowing);
        router.refresh();
      }
    } catch {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface p-6 rounded-xl space-y-4">
      <div className="flex items-center gap-4">
        <Avatar height={80} imageSrc={user.image} width={80} />

        <div>
          <h2 className="text-xl font-semibold text-white">
            {user.name || "Chưa có tên"}
          </h2>
          <p className="text-text-muted">@{user.username}</p>
        </div>
      </div>

      <div>
        {user.bio ? (
          <p className="text-white">{user.bio}</p>
        ) : isCurrentUser ? (
          <button
            className="text-blue-400 hover:underline"
            onClick={openEditProfile}
            type="button"
          >
            Thêm tiểu sử
          </button>
        ) : null}
      </div>

      <div className="flex gap-6 text-sm text-text-muted">
        <p>{user._count.posts} bài viết</p>
        <p>{user._count.followers} người theo dõi</p>
        <p>{user._count.following} đang theo dõi</p>
      </div>

      {isCurrentUser ? (
        <button
          className="bg-white text-black px-4 py-2 rounded-lg"
          onClick={openEditProfile}
          type="button"
        >
          Chỉnh sửa hồ sơ
        </button>
      ) : (
        <button
          className={`px-4 py-2 rounded-lg ${
            isFollowing
              ? "bg-surface border border-white text-white"
              : "bg-blue-500 text-white"
          }`}
          disabled={isLoading}
          onClick={handleFollow}
          type="button"
        >
          {isLoading ? "..." : isFollowing ? "Đang theo dõi" : "Theo dõi"}
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
