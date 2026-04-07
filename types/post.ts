export interface Post {
  _count: {
    likes: number;
    comments: number;
  };

  author: {
    id: string;
    username: string;
    name: string;
    image: string | null;
  };
  content: string | null;
  createdAt: string;
  id: string;
  image: string | null;

  likes: {
    userId: string;
  }[];
}
