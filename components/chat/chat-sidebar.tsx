"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import UserAvatar from "../user-avatar";
import { UserType } from "@/models/User";
import cn from "@/utils/utils";
import { useParams, useRouter } from "next/navigation";
import { useSocket } from "@/providers/socket-provider";

type ChatSidebarProps = {
  users: UserType[];
};

export default function ChatSidebar({ users }: ChatSidebarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const { socket, isConnected, notifications, setNotifications } = useSocket();

  // useEffect(() => {
  //   if (!socket || !session) {
  //     return;
  //   }

  //   const receiveMessage = (message: any) => {
  //     console.log(message);

  //     // if the new message is from user whose conversation is
  //     // currently displayed on the screen
  //     if (params && message.fromUserId._id.toString() === params.userId) {
  //       router.refresh();
  //     }
  //   };

  //   socket.on(`${session.user.id}:messages`, receiveMessage);
  // }, [socket, session, router, params]);
  useEffect(() => {
    console.log({ Sidebarnotifications: notifications });
  }, [notifications]);

  if (!session) {
    return null;
  }

  return (
    <>
      <p>Selected user: {params?.userId}</p>
      <p>Is connected: {isConnected ? "connected" : "disconnected"}</p>
      {users.map((user) => (
        <div
          key={user._id.toString()}
          className={cn(
            "flex gap-3 p-3 items-center cursor-pointer hover:bg-[#eee]",
            params?.userId === user._id.toString() && "bg-slate-200"
          )}
          onClick={() => router.push(`/messages/${user._id.toString()}`)}
        >
          <UserAvatar width={40} height={40} src={user.profileImage} />
          <div>
            <span
              className={cn(
                notifications.includes(user._id.toString()) && "font-bold"
              )}
            >
              {user.username}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
