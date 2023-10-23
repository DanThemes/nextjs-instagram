"use client";

import React from "react";
import UserAvatar from "../user-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ChatForm from "./chat-form";
import ChatContentEmpty from "./chat-content-empty";

type ChatContentProps = {
  messages: any;
};

export default function ChatContent({ messages }: ChatContentProps) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  if (!messages) {
    return <ChatContentEmpty />;
  }

  return (
    <>
      <div className="border-b border-[#dbdbdb] p-3 w-full ">
        <Link href={`/${session.user.username}`}>
          <div className="flex gap-3 items-center">
            <UserAvatar
              width={40}
              height={40}
              src={session.user.profileImage}
            />
            <div>
              {/* Use displayName here instead */}
              <span>{session.user.username}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-3 items-center p-6">
          <UserAvatar width={80} height={80} src={session.user.profileImage} />
          <div className="flex flex-col items-center">
            {/* Use displayName here instead */}
            <span className="font-bold">displayName</span>
            <span className="text-slate-400 text-sm">
              username &bull; Instagram
            </span>
            <span className="mt-3">
              <button className="gray_button">View profile</button>
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 overflow-x-scroll no-scrollbar p-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm text-center text-slate-400">
              message date, hour
            </span>
            <div className="flex gap-3 items-center self-start">
              <span>
                <UserAvatar
                  width={25}
                  height={25}
                  src={session.user.profileImage}
                />
              </span>
              <span className="bg-[#eee] rounded-[1rem] px-3 py-1 self-start">
                message 1
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              <span className="text-sm text-center text-slate-400">
                message date, hour
              </span>
              <div className="flex gap-3 items-center self-end">
                <span>
                  <UserAvatar
                    width={25}
                    height={25}
                    src={session.user.profileImage}
                  />
                </span>
                <span className="bg-[#3797f0] text-white rounded-[1rem] px-3 py-1">
                  message 2
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ChatForm session={session} />
          </div>
        </div>
      </div>
    </>
  );
}
