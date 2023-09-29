import { create } from "zustand";

type PostModalType = {
  isOpen: boolean;
  toggle: () => void;
};

const usePostModal = create<PostModalType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default usePostModal;
