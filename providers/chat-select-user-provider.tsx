"use client";

import { createContext, useContext, useState } from "react";

type StateType = {
  selectedUserId: string | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

const initialState = {
  selectedUserId: null,
  setSelectedUserId: () => {},
};

const ChatSelectUser = createContext<StateType>(initialState);

export const useChatSelectedUser = () => {
  return useContext(ChatSelectUser);
};

export const ChatSelectUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const value = {
    selectedUserId,
    setSelectedUserId,
  };

  return (
    <ChatSelectUser.Provider value={value}>{children}</ChatSelectUser.Provider>
  );
};
