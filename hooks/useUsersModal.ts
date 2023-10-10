import { UserType } from "@/models/User";
import { create } from "zustand";

type UsersModalType = {
  isOpen: boolean;
  users: UserType[] | [];
  title?: string;
  toggle: () => void;
  setTitle: (value: string) => void;
  setUsers: (array: UserType[] | []) => void;
};

const useUsersModal = create<UsersModalType>((set) => ({
  isOpen: false,
  users: [],
  title: undefined,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setTitle: (value) => set(() => ({ title: value })),
  setUsers: (array) => set(() => ({ users: array })),
}));

export default useUsersModal;
