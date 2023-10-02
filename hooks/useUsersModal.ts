import { UserType } from "@/models/User";
import { create } from "zustand";

type UsersModalType = {
  isOpen: boolean;
  users: UserType[] | [];
  toggle: () => void;
  setUsers: (array: UserType[] | []) => void;
};

const useUsersModal = create<UsersModalType>((set) => ({
  isOpen: false,
  users: [],
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setUsers: (array) => set(() => ({ users: array })),
}));

export default useUsersModal;
