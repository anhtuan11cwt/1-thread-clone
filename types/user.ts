export interface User {
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
  bio: string | null;
  createdAt: Date;
  email: string;
  id: string;
  image: string | null;
  name: string | null;
  username: string | null;
}
