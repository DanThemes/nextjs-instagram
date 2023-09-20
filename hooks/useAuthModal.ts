import { create } from "zustand";

type AuthModalType = {
  isOpen: boolean;
  tab: "login" | "register";
  toggle: () => void;
  setTab: (value: "login" | "register") => void;
};

const useAuthModal = create<AuthModalType>((set) => ({
  isOpen: false,
  tab: "login",
  toggle: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
  setTab: (value) => {
    if (value) {
      set({ tab: value });
    }
  },
}));

export default useAuthModal;
