"use client";

import UserAvatar from "@/components/user-avatar";
import useUploadAvatarModal from "@/hooks/useUploadAvatarModal";
import cn from "@/utils/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

type ProfileAvatarProps = {
  profileImage?: string | undefined;
};

export default function ProfileAvatar({ profileImage }: ProfileAvatarProps) {
  const uploadAvatarModal = useUploadAvatarModal();
  const { data: session } = useSession();
  const { username } = useParams();

  const isCurrentUserOwner = session && session.user.username === username;

  return (
    <span className="w-150px] h-[150px]">
      <UserAvatar
        src={profileImage}
        width={150}
        height={150}
        className={isCurrentUserOwner ? "cursor-pointer" : ""}
        onClick={() => isCurrentUserOwner && uploadAvatarModal.toggle()}
      />
    </span>
  );
}
