import { MediaType } from "@/models/Media";
import { create } from "zustand";

type LimitedPostType = { _id: string; caption: string; media: MediaType[] };

type PostModalType = {
  isOpen: boolean;
  post: LimitedPostType | null;
  hideLikes: boolean;
  commentsDisabled: boolean;
  toggle: () => void;
  setHideLikes: (value: boolean) => void;
  setCommentsDisabled: (value: boolean) => void;
  setPost: (post: LimitedPostType) => void;
};

const usePostModal = create<PostModalType>((set) => ({
  isOpen: false,
  post: null,
  hideLikes: false,
  commentsDisabled: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setHideLikes: (value) => set(() => ({ hideLikes: value })),
  setCommentsDisabled: (value) => set(() => ({ commentsDisabled: value })),
  setPost: (post) => set(() => ({ post })),
}));

export default usePostModal;
