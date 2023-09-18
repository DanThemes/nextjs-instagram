import { create } from "zustand";

type AuthModalType = {
  isOpen: boolean;
  toggle: () => void;
};

const useAuthModal = create<AuthModalType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useAuthModal;
