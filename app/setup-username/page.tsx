"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authStyles } from "../(auth)/styles";

export default function SetupUsernamePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      toast.error("Vui lòng nhập username");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/setup-username", { username });

      toast.success("Thiết lập thành công");

      router.push("/feed");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err?.response?.data?.error || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Thiết lập tên người dùng
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className={authStyles.input}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Chọn tên người dùng của bạn"
            type="text"
            value={username}
          />

          <button
            className={authStyles.button}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Đang xử lý...
              </span>
            ) : (
              "Tiếp tục"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
