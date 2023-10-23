"use client";

import { Types } from "mongoose";
import { createContext, useContext, useState } from "react";

type InitialStateType = {
  selectedUser: Types.ObjectId | null;
  setSelectedUser?: React.Dispatch<React.SetStateAction<null>>;
};

const initialState: InitialStateType = {
  selectedUser: null,
  setSelectedUser: undefined,
};

const ChatSelectUser = createContext(initialState);

export const useChatSelectedUser = () => {
  return useContext(ChatSelectUser);
};

export const ChatSelectUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const value = {
    selectedUser: selectedUser || null,
    setSelectedUser,
  };

  return (
    <ChatSelectUser.Provider value={value}>{children}</ChatSelectUser.Provider>
  );
};
