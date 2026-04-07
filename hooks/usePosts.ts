import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPosts = async ({
  pageParam,
}: {
  pageParam: string | null;
}): Promise<{
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}> => {
  const res = await fetch(`/api/post?cursor=${pageParam ?? ""}&limit=3`);
  if (!res.ok) throw new Error("Lấy bài đăng thất bại");
  return res.json();
};

interface Post {
  _count: {
    comments: number;
    likes: number;
  };
  author: {
    id: string;
    image: string | null;
    name: string | null;
    username: string | null;
  };
  content: string | null;
  createdAt: string;
  id: string;
  image: string | null;
  isLiked: boolean;
}

export const usePosts = () => {
  return useInfiniteQuery({
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    queryFn: fetchPosts,
    queryKey: ["posts"],
  });
};
