"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  showBackButton?: boolean;
  title: string;
}

export default function Container({
  children,
  title,
  showBackButton = false,
}: Props) {
  const router = useRouter();

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 md:left-64 bg-background border-b border-border flex items-center gap-3 p-4 z-50">
        {showBackButton && (
          <button onClick={() => router.back()} type="button">
            <ArrowLeft />
          </button>
        )}
        <h1 className="text-white font-semibold">{title}</h1>
      </div>
      <main className="mt-16 p-4">{children}</main>
    </div>
  );
}
