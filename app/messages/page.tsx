import ChatContent from "@/components/chat/chat-content";
import ChatSidebar from "@/components/chat/chat-sidebar";
import React from "react";

export default function MessagesPage() {
  return (
    <div className="-m-10 flex">
      <div className="w-[24rem] border-r border-[#DBDBDB] h-[100dvh] p-3 overflow-y-scroll no-scrollbar">
        <ChatSidebar />
      </div>
      <div className="h-[100dvh] p-3">
        <ChatContent />
      </div>
    </div>
  );
}
