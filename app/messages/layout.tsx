import ChatSidebar from "@/components/chat/chat-sidebar";
import { getChatInfo } from "@/utils/api";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
// import { SocketProvider } from "@/providers/socket-provider";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const { users } = await getChatInfo(session.user.id);

  return (
    // <SocketProvider>
    <div className="-m-10 flex">
      <div className="w-[24rem] border-r border-[#DBDBDB] h-[100dvh] overflow-y-scroll scrollbar">
        <ChatSidebar users={users} />
      </div>
      <div className="h-[100dvh] w-full flex flex-col overflow-y-scroll scrollbar">
        {children}
      </div>
    </div>
    // </SocketProvider>
  );
}
