"use client";

import Avatar from "@/components/ui/Avatar";
import { useModalStore } from "@/store/useModalStore";
import type { User } from "@/types/user";

interface ProfileCardProps {
  isCurrentUser?: boolean;
  user: User;
}

const ProfileCard = ({ user, isCurrentUser = true }: ProfileCardProps) => {
  const { openEditProfile } = useModalStore();

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
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          type="button"
        >
          Theo dõi
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
