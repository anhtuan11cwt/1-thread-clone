export interface Post {
  _count: {
    likes: number;
    comments: number;
  };

  author: {
    id: string;
    username: string | null;
    name: string | null;
    image: string | null;
  };
  content: string | null;
  createdAt: string;
  id: string;
  image: string | null;

  isLiked: boolean;
}
