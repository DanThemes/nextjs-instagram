"use client";

import Modal from "@/components/modal/modal";
import UploadButton from "@/components/upload-button";
import cn from "@/utils/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

type ProfileAvatarProps = {
  username: string;
  profileImage?: string | undefined;
};

export default function ProfileAvatar({
  username,
  profileImage,
}: ProfileAvatarProps) {
  const [show, setShow] = useState<boolean>(false);

  const { data: session } = useSession();

  const toggle = () => {
    setShow((prev) => !prev);
  };

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
        onClick={toggle}
      />
      {isCurrentUserOwner && (
        <Modal isOpen={show} toggle={toggle}>
          <UploadButton
            size="small"
            endpoint="avatarUploader"
            idOrUsername={username}
            profileImage={profileImage}
          />
        </Modal>
      )}
    </>
  );
}
