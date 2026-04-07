import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePosts } from "@/hooks/usePosts";
import LoadingSpinner from "../ui/LoadingSpinner";
import FeedPost from "./FeedPost";

export default function Feed() {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePosts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <LoadingSpinner />;

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <FeedPost action key={post.id} post={post} />
      ))}

      <div ref={ref} />

      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
}
