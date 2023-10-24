import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChatContent from "@/components/chat/chat-content";
import { getChatInfo, getUser } from "@/utils/api";
import { getServerSession } from "next-auth";
import React from "react";

export default async function MessagePage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const data = await getChatInfo(session.user.id);
  const selectedUser = params.userId ? await getUser(params.userId) : null;

  console.log(data.users);

  return <ChatContent selectedUser={selectedUser} messages={data.messages} />;
}
