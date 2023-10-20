"use client";

import { useSession } from "next-auth/react";
import React from "react";
import UserAvatar from "../user-avatar";

export default function ChatSidebar() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="flex gap-3 items-center">
        <UserAvatar width={40} height={40} src={session.user.profileImage} />
        <div>
          <span>{session.user.username}</span>
        </div>
      </div>
    </>
  );
}
