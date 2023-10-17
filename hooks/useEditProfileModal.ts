import { create } from "zustand";

type EditProfileModalType = {
  isOpen: boolean;
  toggle: () => void;
};

const useEditProfileModal = create<EditProfileModalType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useEditProfileModal;
