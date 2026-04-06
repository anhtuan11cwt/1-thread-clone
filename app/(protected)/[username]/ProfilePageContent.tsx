import ProfileCard from "@/components/profile/ProfileCard";
import { getUserProfileByUsername } from "@/server-actions/getUserProfileByUsername";

interface Props {
  username: string;
}

export default async function ProfilePageContent({ username }: Props) {
  const user = await getUserProfileByUsername(username);

  if (!user) {
    return (
      <div className="text-center text-text-muted mt-10">
        Không tìm thấy người dùng
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ProfileCard isCurrentUser={false} user={user} />
    </div>
  );
}
