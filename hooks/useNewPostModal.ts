import { create } from "zustand";

type NewPostModalType = {
  isOpen: boolean;
  toggle: () => void;
};

const useNewPostModal = create<NewPostModalType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useNewPostModal;
