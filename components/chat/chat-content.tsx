"use client";

import React from "react";
import UserAvatar from "../user-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ChatForm from "./chat-form";
import ChatContentEmpty from "./chat-content-empty";
import { UserType } from "@/models/User";
import { PopulatedMessageType } from "@/models/Message";
import cn from "@/utils/utils";
import { formatDistance } from "date-fns";

type ChatContentProps = {
  selectedUser: UserType | null;
  messages: PopulatedMessageType[];
};

export default function ChatContent({
  selectedUser,
  messages,
}: ChatContentProps) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  if (!selectedUser) {
    return <ChatContentEmpty />;
  }

  return (
    <>
      <div className="border-b border-[#dbdbdb] p-3 w-full ">
        <Link href={`/${selectedUser.username}`}>
          <div className="flex gap-3 items-center">
            <UserAvatar
              width={40}
              height={40}
              src={selectedUser.profileImage}
            />
            <div>
              <span>{selectedUser.displayName}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-3 items-center p-6">
          <UserAvatar width={80} height={80} src={selectedUser.profileImage} />
          <div className="flex flex-col items-center">
            <span className="font-bold">{selectedUser.displayName}</span>
            <span className="text-slate-400 text-sm">
              {selectedUser.username} &bull; Instagram
            </span>
            <span className="mt-3">
              <Link href={`/${selectedUser.username}`}>
                <button className="gray_button">View profile</button>
              </Link>
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="mt-12 flex flex-col gap-3 overflow-x-scroll no-scrollbar p-6">
          {messages.map((message) => (
            <div key={message._id.toString()} className="flex flex-col gap-3">
              <span className="text-sm text-center text-slate-400">
                {formatDistance(new Date(message.createdAt), new Date())}
              </span>
              <div
                className={cn(
                  "flex gap-3 items-center",
                  message.fromUserId._id.toString() === session.user.id
                    ? "self-end"
                    : "self-start"
                )}
              >
                <span>
                  <UserAvatar
                    width={25}
                    height={25}
                    src={message.fromUserId.profileImage}
                  />
                </span>
                <span
                  className={cn(
                    "rounded-[1rem] px-3 py-1 ",
                    message.fromUserId._id.toString() === session.user.id
                      ? "bg-[#3797f0] text-white"
                      : "bg-[#eee]"
                  )}
                >
                  {message.text}
                </span>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <ChatForm session={session} />
          </div>
        </div>
      </div>
    </>
  );
}
