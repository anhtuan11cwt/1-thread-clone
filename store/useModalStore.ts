import { create } from "zustand";

interface ModalStore {
  closeAll: () => void;
  closeCreatePost: () => void;
  closeEditProfile: () => void;
  closeReplyPost: () => void;
  isCreatePostOpen: boolean;
  isEditProfileOpen: boolean;
  isReplyPostOpen: boolean;

  openCreatePost: () => void;

  openEditProfile: () => void;

  openReplyPost: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  closeAll: () =>
    set({
      isCreatePostOpen: false,
      isEditProfileOpen: false,
      isReplyPostOpen: false,
    }),
  closeCreatePost: () => set({ isCreatePostOpen: false }),
  closeEditProfile: () => set({ isEditProfileOpen: false }),
  closeReplyPost: () => set({ isReplyPostOpen: false }),
  isCreatePostOpen: false,
  isEditProfileOpen: false,
  isReplyPostOpen: false,

  openCreatePost: () => set({ isCreatePostOpen: true }),

  openEditProfile: () => set({ isEditProfileOpen: true }),

  openReplyPost: () => set({ isReplyPostOpen: true }),
}));
