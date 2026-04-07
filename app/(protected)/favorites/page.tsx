import { Heart } from "lucide-react";
import { Suspense } from "react";
import FeedPost from "@/components/feed/FeedPost";
import Container from "@/components/layout/Container";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getLikedPosts } from "@/server-actions/getLikedPosts";

export default function FavoritesPage() {
  return (
    <Container title="Favorites">
      <Suspense fallback={<LoadingSpinner />}>
        <FavoritesContent />
      </Suspense>
    </Container>
  );
}

async function FavoritesContent() {
  const posts = await getLikedPosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-14 text-center space-y-4">
        <Heart className="mb-3 opacity-70 text-text-muted" size={36} />
        <p className="text-sm font-medium text-text-muted">
          You have no favorite posts
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}
