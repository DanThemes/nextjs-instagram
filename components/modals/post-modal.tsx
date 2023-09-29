"use client";

import React from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import usePostModal from "@/hooks/usePostModal";

export default function PostModal() {
  const postModal = usePostModal();
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Modal
      isOpen={postModal.isOpen}
      toggle={postModal.toggle}
      title="Post Settings"
    >
      <ul className="flex flex-col gap-3">
        <li>
          <span>Delete</span>
        </li>
      </ul>
    </Modal>
  );
}
