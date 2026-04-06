"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authStyles } from "../styles";

interface LoginValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Đăng nhập thất bại");
        return;
      }

      toast.success("Đăng nhập thành công");

      router.push("/feed");
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">
          Đăng nhập
        </h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            className={authStyles.input}
            name="email"
            onChange={handleChange}
            placeholder="Nhập email của bạn"
            type="email"
            value={values.email}
          />

          <div className="relative">
            <input
              className={authStyles.inputWithIcon}
              name="password"
              onChange={handleChange}
              placeholder="Nhập mật khẩu của bạn"
              type={showPassword ? "text" : "password"}
              value={values.password}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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
              "Đăng nhập"
            )}
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
