"use client";

import { Heart, Home, LogOut, PlusSquare, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";

const navItems = [
  { href: "/", icon: Home, label: "Trang chủ" },
  { href: "/search", icon: Search, label: "Tìm kiếm" },
  { href: "#", icon: PlusSquare, isAction: true, label: "Tạo bài" },
  { href: "/favorites", icon: Heart, label: "Yêu thích" },
  { href: "/profile", icon: User, label: "Hồ sơ" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/login");
  };

  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-64 p-4 border-r border-border bg-background">
      <div className="space-y-6">
        <Logo />

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.isAction) {
              return (
                <button
                  className="flex items-center gap-3 p-3 rounded-lg text-text-muted hover:bg-surface transition cursor-pointer"
                  key={item.label}
                  type="button"
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-surface text-white"
                    : "text-text-muted hover:bg-surface"
                }`}
                href={item.href}
                key={item.label}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-surface transition"
        onClick={handleLogout}
        type="button"
      >
        <LogOut />
        Đăng xuất
      </button>
    </aside>
  );
}
