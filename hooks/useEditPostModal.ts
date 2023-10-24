import { MediaType } from "@/models/Media";
import { create } from "zustand";

type LimitedPostType = { _id: string; caption: string; media: MediaType[] };

type EditPostModalType = {
  isOpen: boolean;
  post: LimitedPostType | null;
  toggle: () => void;
  setPost: (post: LimitedPostType) => void;
};

const useEditPostModal = create<EditPostModalType>((set) => ({
  isOpen: false,
  post: null,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setPost: (post) => set(() => ({ post })),
}));

export default useEditPostModal;
