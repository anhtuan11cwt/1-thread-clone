"use client";

import { Search } from "lucide-react";

interface Props {
  onChange: (val: string) => void;
  value: string;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

      <input
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm người dùng..."
        type="text"
        value={value}
      />
    </div>
  );
}
