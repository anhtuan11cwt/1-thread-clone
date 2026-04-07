"use client";

import { authClient } from "@/lib/auth-client";
import { useModalStore } from "@/store/useModalStore";
import Avatar from "../ui/Avatar";

const CreatePostAction = () => {
  const { data: session } = authClient.useSession();
  const { openCreatePost } = useModalStore();

  if (!session) return null;

  return (
    <div className="flex items-center gap-3 border-b border-border p-4">
      <Avatar
        alt={session.user.name || "avatar"}
        height={40}
        imageSrc={session.user.image}
        width={40}
      />

      <button
        className="flex-1 text-text-muted cursor-pointer text-lg py-2 text-left"
        onClick={openCreatePost}
        type="button"
      >
        Có gì mới?
      </button>

      <button
        className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
        onClick={openCreatePost}
        type="button"
      >
        Đăng
      </button>
    </div>
  );
};

export default CreatePostAction;
