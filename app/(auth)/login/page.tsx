"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authStyles } from "../styles";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Đăng nhập
        </h1>

        <form className="space-y-4">
          <input
            className={authStyles.input}
            placeholder="Nhập email của bạn"
            type="email"
          />

          <div className="relative">
            <input
              className={authStyles.inputWithIcon}
              placeholder="Nhập mật khẩu của bạn"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button className={authStyles.button} type="submit">
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Chưa có tài khoản?{" "}
          <Link className="text-white hover:underline" href="/register">
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}
