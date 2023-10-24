import ChatContent from "@/components/chat/chat-content";
import ChatSidebar from "@/components/chat/chat-sidebar";
import { getChatInfo } from "@/utils/api";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ChatSelectUserProvider } from "@/providers/chat-select-user-provider";

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }
  console.log({ session: session });

  const data = await getChatInfo(session.user.id);
  console.log({ dataUsers: data.users, dataMessages: data.messages });

  return (
    <ChatSelectUserProvider>
      <div className="-m-10 flex">
        <div className="w-[24rem] border-r border-[#DBDBDB] h-[100dvh] p-3 overflow-y-scroll no-scrollbar">
          <ChatSidebar users={data.users} />
        </div>
        <div className="h-[100dvh] w-full flex flex-col">
          <ChatContent messages={data.messages} />
        </div>
      </div>
    </ChatSelectUserProvider>
  );
}
