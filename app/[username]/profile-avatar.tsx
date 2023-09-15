"use client";

import UploadAvatarModal from "@/components/modals/upload-avatar-modal";
import useUploadAvatarModal from "@/hooks/useUploadAvatarModal";
import cn from "@/utils/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type ProfileAvatarProps = {
  profileImage?: string | undefined;
};

export default function ProfileAvatar({ profileImage }: ProfileAvatarProps) {
  const uploadAvatarModal = useUploadAvatarModal();
  const { data: session } = useSession();

  const isCurrentUserOwner = session && session.user.username;

  return (
    <>
      <Image
        src={profileImage || "/avatar.jpg"}
        width={150}
        height={150}
        alt={"avatar"}
        className={cn("rounded-full border w-[150px] h-[150px] object-cover", {
          "cursor-pointer": isCurrentUserOwner,
        })}
        onClick={uploadAvatarModal.toggle}
        priority
      />
      {isCurrentUserOwner && <UploadAvatarModal />}
    </>
  );
}
