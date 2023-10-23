import ChatContent from "@/components/chat/chat-content";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { getChatInfo } from "@/utils/api";
import { getServerSession } from "next-auth";
import React from "react";

export default async function MessagesPage() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }
  console.log({ session: session });

  const { users, messages } = await getChatInfo(session.user.id);

  return (
    <div className="-m-10 flex">
      <div className="w-[24rem] border-r border-[#DBDBDB] h-[100dvh] p-3 overflow-y-scroll no-scrollbar">
        <ChatSidebar />
      </div>
      <div className="h-[100dvh] w-full flex flex-col">
        <ChatContent messages={messages} />
      </div>
    </div>
  );
}
