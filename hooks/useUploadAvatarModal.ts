import { create } from "zustand";

type UploadAvatarModalType = {
  isOpen: boolean;
  toggle: () => void;
};

const useUploadAvatarModal = create<UploadAvatarModalType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useUploadAvatarModal;
