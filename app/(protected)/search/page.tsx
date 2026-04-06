"use client";

import { useCallback, useEffect, useState } from "react";
import SearchCard from "@/components/search/SearchCard";
import SearchInput from "@/components/search/SearchInput";

interface User {
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
  bio: string | null;
  id: string;
  image: string | null;
  name: string;
  username: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (q: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/search?q=${q}`);
      const data = await res.json();
      setUsers(data.users ?? []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers("");
  }, [fetchUsers]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, fetchUsers]);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <SearchInput onChange={setQuery} value={query} />

      {loading && <p className="text-sm text-gray-400">Đang tìm kiếm...</p>}

      {!loading && users.length === 0 && (
        <p className="text-sm text-gray-400">Không tìm thấy người dùng</p>
      )}

      <div className="space-y-3">
        {users.map((user) => (
          <SearchCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
