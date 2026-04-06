import { getCurrentUserProfile } from "@/server-actions/getCurrentUserProfile";
import ProfileCard from "./ProfileCard";

const ProfileComponent = async () => {
  const user = await getCurrentUserProfile();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProfileCard isCurrentUser={true} user={user} />
    </div>
  );
};

export default ProfileComponent;
