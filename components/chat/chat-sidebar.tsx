"use client";

import { useSession } from "next-auth/react";
import React from "react";
import UserAvatar from "../user-avatar";
import { UserType } from "@/models/User";
import { useChatSelectedUser } from "@/providers/chat-select-user-provider";

type ChatSidebarProps = {
  users: UserType[];
};

export default function ChatSidebar({ users }: ChatSidebarProps) {
  const { data: session } = useSession();
  const { selectedUserId, setSelectedUserId } = useChatSelectedUser();

  if (!session) {
    return null;
  }

  const handleSelectChatUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <>
      {users.map((user) => (
        <div
          key={user._id.toString()}
          className="flex gap-3 items-center"
          onClick={() => handleSelectChatUser(user._id.toString())}
        >
          <UserAvatar width={40} height={40} src={user.profileImage} />
          <div>
            <span>{user.username}</span>
          </div>
        </div>
      ))}
    </>
  );
}
