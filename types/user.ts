export interface User {
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
  bio: string | null;
  createdAt: Date;
  email: string | null;
  id: string;
  image: string | null;
  isFollowing?: boolean;
  name: string | null;
  username: string | null;
}
