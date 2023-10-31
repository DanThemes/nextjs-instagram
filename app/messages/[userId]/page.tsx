import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChatContent from "@/components/chat/chat-content";
import { PopulatedMessageType } from "@/models/Message";
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

  // Keep only messages for the current params.userId
  const messages = data.messages.filter(
    (message: PopulatedMessageType) =>
      message.fromUserId._id.toString() === params.userId ||
      message.toUserId._id.toString() === params.userId
  );

  // console.log({ pageMessageObject: messages[messages.length - 1].text });

  return <ChatContent selectedUser={selectedUser} messages={messages} />;
}
