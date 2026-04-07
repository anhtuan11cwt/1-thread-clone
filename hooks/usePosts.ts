import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/types/post";

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("/api/post");
  if (!res.ok) throw new Error("Lấy bài đăng thất bại");
  return res.json();
};

export const usePosts = () => {
  return useQuery({
    queryFn: fetchPosts,
    queryKey: ["post"],
  });
};
