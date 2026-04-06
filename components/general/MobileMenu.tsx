"use client";

import { Heart, Home, PlusSquare, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: Home, label: "home" },
  { href: "/search", icon: Search, label: "search" },
  { href: "#", icon: PlusSquare, isAction: true, label: "create" },
  { href: "/favorites", icon: Heart, label: "favorites" },
  { href: "/profile", icon: User, label: "profile" },
];

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border flex justify-around py-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        if (item.isAction) {
          return (
            <button key={item.label} type="button">
              <Icon className="text-white" size={28} />
            </button>
          );
        }

        return (
          <Link href={item.href} key={item.label}>
            <Icon
              className={isActive ? "text-white" : "text-text-muted"}
              size={28}
            />
          </Link>
        );
      })}
    </div>
  );
}
