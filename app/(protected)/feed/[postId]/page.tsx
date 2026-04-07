import { Suspense } from "react";
import Container from "@/components/layout/Container";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PostLoader from "./PostLoader";

interface PostPageParams {
  params: Promise<{
    postId: string;
  }>;
}

export default async function PostViewPage({ params }: PostPageParams) {
  const { postId } = await params;

  return (
    <Container showBackButton={true} title="Thread">
      <Suspense fallback={<LoadingSpinner />}>
        <PostLoader postId={postId} />
      </Suspense>
    </Container>
  );
}
