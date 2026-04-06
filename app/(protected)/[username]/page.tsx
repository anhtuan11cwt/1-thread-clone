import { Suspense } from "react";
import ProfileLoader from "@/components/loaders/ProfileLoader";
import ProfilePageContent from "./ProfilePageContent";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { username } = await params;

  return (
    <Suspense fallback={<ProfileLoader />}>
      <ProfilePageContent username={username} />
    </Suspense>
  );
}
