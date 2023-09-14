"use client";

import React from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import useNewPostModal from "@/hooks/useNewPostModal";

export default function NewPostModal() {
  const newPostModal = useNewPostModal();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Modal
      isOpen={newPostModal.isOpen}
      toggle={newPostModal.toggle}
      title="Change Profile Photo"
    >
      add new post form here
    </Modal>
  );
}
