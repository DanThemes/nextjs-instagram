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
        <li className="py-2 border-b border-[#eee] text-red-700 hover:text-red-700/50 cursor-pointer">
          <span>Delete</span>
        </li>
        <li className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer">
          <span>Edit post</span>
        </li>
        <li className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer">
          <span>Hide like count</span>
        </li>
        <li className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer">
          <span>Turn off commenting</span>
        </li>
        <li className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer">
          <span>Go to post</span>
        </li>
        <li className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer">
          <span>Share to...</span>
        </li>
        <li
          className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <span>Copy link</span>
        </li>
        <li
          className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
          onClick={postModal.toggle}
        >
          <span>Cancel</span>
        </li>
      </ul>
    </Modal>
  );
}
