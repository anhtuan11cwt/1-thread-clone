"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authStyles } from "../styles";

interface RegisterValues {
  email: string;
  name: string;
  password: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<RegisterValues>({
    email: "",
    name: "",
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!values.email || !values.password || !values.name) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
      });

      if (error) {
        toast.error(error.message || "Đăng ký thất bại");
        return;
      }

      toast.success("Đăng ký thành công");

      router.push("/setup-username");
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
          Đăng ký
        </h1>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            className={authStyles.input}
            name="name"
            onChange={handleChange}
            placeholder="Nhập họ tên đầy đủ"
            type="text"
            value={values.name}
          />

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
              "Đăng ký"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Đã có tài khoản?{" "}
          <Link className="text-white hover:underline" href="/login">
            Đăng nhập
          </Link>
        </p>
      </div>
    </main>
  );
}
