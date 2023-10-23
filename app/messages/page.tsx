import ChatContent from "@/components/chat/chat-content";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { getChatInfo } from "@/utils/api";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }
  console.log({ session: session });

  const data = await getChatInfo(session.user.id);
  console.log({ data });

  return (
    <div className="-m-10 flex">
      <div className="w-[24rem] border-r border-[#DBDBDB] h-[100dvh] p-3 overflow-y-scroll no-scrollbar">
        <ChatSidebar />
      </div>
      <div className="h-[100dvh] w-full flex flex-col">
        <ChatContent messages={data} />
      </div>
    </div>
  );
}
