import { Suspense } from "react";
import ProfileComponent from "@/components/profile/ProfileComponent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProfilePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfileComponent />
    </Suspense>
  );
}
