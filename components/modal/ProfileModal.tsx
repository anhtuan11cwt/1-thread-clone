"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import Avatar from "@/components/ui/Avatar";
import { useModalStore } from "@/store/useModalStore";
import type { User } from "@/types/user";
import Modal from "./Modal";

interface ProfileModalProps {
  userProfile: User;
}

export default function ProfileModal({ userProfile }: ProfileModalProps) {
  const router = useRouter();
  const { isEditProfileOpen, closeEditProfile } = useModalStore();

  const [name, setName] = useState(userProfile.name || "");
  const [username, setUsername] = useState(userProfile.username || "");
  const [bio, setBio] = useState(userProfile.bio || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    userProfile.image || null,
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !username.trim()) {
      toast.error("Tên và username không được để trống");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("bio", bio || "");

      if (avatarFile) {
        formData.append("image", avatarFile);
      }

      await axios.patch("/api/profile/update", formData);

      toast.success("Cập nhật profile thành công");
      router.refresh();
      closeEditProfile();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Có lỗi xảy ra");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isEditProfileOpen}
      onClose={closeEditProfile}
      title="Chỉnh sửa hồ sơ"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <Avatar
            alt={name || "ảnh đại diện"}
            height={96}
            imageSrc={avatarPreview}
            width={96}
          />
          <input
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
            ref={fileInputRef}
            type="file"
          />
          <button
            className="font-semibold text-blue-500 text-sm hover:underline"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            Thay đổi ảnh
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-medium text-white text-sm" htmlFor="name">
              Tên
            </label>
            <input
              className="bg-surface p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white placeholder:text-text-muted"
              id="name"
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            />
          </div>

          <div className="space-y-2">
            <label
              className="font-medium text-white text-sm"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="bg-surface p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white placeholder:text-text-muted"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-white text-sm" htmlFor="bio">
              Tiểu sử
            </label>
            <textarea
              className="bg-surface p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-25 text-white placeholder:text-text-muted resize-none"
              id="bio"
              onChange={(e) => setBio(e.target.value)}
              placeholder="Viết gì đó về bản thân..."
              value={bio}
            />
          </div>
        </div>

        <button
          className="bg-white hover:opacity-90 disabled:opacity-50 py-2 rounded-lg w-full font-semibold text-black transition cursor-pointer"
          disabled={loading}
          onClick={handleSubmit}
          type="button"
        >
          {loading ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </Modal>
  );
}
