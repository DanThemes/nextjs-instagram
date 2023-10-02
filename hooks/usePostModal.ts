import { create } from "zustand";

type PostModalType = {
  isOpen: boolean;
  postId?: string;
  toggle: () => void;
  setPostId: (id: string) => void;
};

const usePostModal = create<PostModalType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setPostId: (id) => set(() => ({ postId: id })),
}));

export default usePostModal;
