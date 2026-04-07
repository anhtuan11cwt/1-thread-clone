import { create } from "zustand";
import type { Post } from "@/types/post";

interface State {
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export const usePostStore = create<State>((set) => ({
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
