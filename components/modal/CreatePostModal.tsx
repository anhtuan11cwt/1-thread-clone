"use client";

import { useQueryClient } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useModalStore } from "@/store/useModalStore";
import AutoSizeTextarea from "../ui/AutoSizeTextarea";
import PostButton from "../ui/PostButton";

const CreatePostModal = () => {
  const { isCreatePostOpen, closeCreatePost } = useModalStore();
  const { data: session } = authClient.useSession();

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async () => {
    if (!content && !imageFile) {
      toast.error("Bài đăng không thể để trống");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("/api/post", {
        body: formData,
        method: "POST",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Tạo bài đăng thất bại");
      }

      setContent("");
      setImageFile(null);
      setImagePreview(null);

      queryClient.invalidateQueries({ queryKey: ["post"] });

      closeCreatePost();
      toast.success("Đã tạo bài đăng!");
    } catch (err) {
      console.error(err);
      toast.error("Tạo bài đăng thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!isCreatePostOpen) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCreatePost();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") closeCreatePost();
      }}
      role="dialog"
    >
      <div className="bg-surface p-4 rounded-xl w-full max-w-lg space-y-4 border border-border">
        <div className="flex justify-between items-center">
          <button
            className="text-text-muted hover:text-white transition"
            onClick={closeCreatePost}
            type="button"
          >
            ✕
          </button>
          <h2 className="text-lg font-semibold text-white">Tạo bài đăng</h2>
          <div className="w-8" />
        </div>

        <div className="flex gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image
              alt="avatar"
              className="object-cover"
              fill
              src={session?.user?.image || "/images/avatar.png"}
            />
          </div>

          <div className="flex-1 space-y-2">
            <AutoSizeTextarea
              className="text-xl min-h-[60px]"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Có gì mới?"
              value={content}
            />

            {imagePreview && (
              <div className="relative mt-2">
                <div className="relative rounded-lg overflow-hidden h-64">
                  <Image
                    alt="preview"
                    className="object-cover"
                    fill
                    src={imagePreview}
                  />
                </div>
                <button
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition cursor-pointer"
                  onClick={removeImage}
                  type="button"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <div className="flex gap-3">
            <button
              className="text-text-muted hover:text-white transition text-xl"
              onClick={() => fileRef.current?.click()}
              type="button"
            >
              🖼️
            </button>

            <button
              className="text-text-muted hover:text-white transition text-xl"
              onClick={() => setShowEmoji(!showEmoji)}
              type="button"
            >
              😊
            </button>

            <input
              accept="image/*"
              hidden
              onChange={handleImage}
              ref={fileRef}
              type="file"
            />
          </div>

          <PostButton
            disabled={loading || (!content && !imageFile)}
            onClick={handleSubmit}
            title="Đăng"
          />
        </div>

        {showEmoji && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <EmojiPicker
              height={400}
              onEmojiClick={(emoji) => setContent((prev) => prev + emoji.emoji)}
              width={300}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;
