import { create } from "zustand";

type PostModalType = {
  isOpen: boolean;
  postId?: string;
  hideLikes: boolean;
  commentsDisabled: boolean;
  toggle: () => void;
  setHideLikes: (value: boolean) => void;
  setCommentsDisabled: (value: boolean) => void;
  setPostId: (id: string) => void;
};

const usePostModal = create<PostModalType>((set) => ({
  isOpen: false,
  hideLikes: false,
  commentsDisabled: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setHideLikes: (value) => set(() => ({ hideLikes: value })),
  setCommentsDisabled: (value) => set(() => ({ commentsDisabled: value })),
  setPostId: (id) => set(() => ({ postId: id })),
}));

export default usePostModal;
