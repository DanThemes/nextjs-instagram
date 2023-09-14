"use client";

import React from "react";
import Modal from "./modal";
import useUploadAvatarModal from "@/hooks/useUploadAvatarModal";
import UploadButton from "../upload-button";
import { useSession } from "next-auth/react";

export default function UploadAvatarModal() {
  const uploadAvatarModal = useUploadAvatarModal();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Modal
      isOpen={uploadAvatarModal.isOpen}
      toggle={uploadAvatarModal.toggle}
      title="Change Profile Photo"
    >
      <UploadButton
        size="small"
        endpoint="avatarUploader"
        username={session.user.username}
        toggleModal={uploadAvatarModal.toggle}
      />
    </Modal>
  );
}
