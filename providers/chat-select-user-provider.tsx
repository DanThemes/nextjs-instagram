"use client";

import { createContext, useContext, useState } from "react";

const ChatSelectUser = createContext(null);

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
    selectedUserId: selectedUserId || null,
    setSelectedUserId,
  };

  return (
    <ChatSelectUser.Provider value={value}>{children}</ChatSelectUser.Provider>
  );
};
