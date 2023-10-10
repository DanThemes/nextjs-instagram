"use client";

import React from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import usePostModal from "@/hooks/usePostModal";
import { deletePost, disableComments, handleHideLikes } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function PostModal() {
  const postModal = usePostModal();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return null;
  }

  if (!postModal.postId) {
    return null;
  }

  console.log({ postModal });

  const handleDelete = async () => {
    await deletePost(postModal.postId as string);
    postModal.toggle();
    router.refresh();
  };

  const handleGoToPost = async () => {
    postModal.toggle();
    router.push(`/posts/${postModal.postId}`);
  };

  const handleToggleDisableComments = async () => {
    await disableComments({
      postId: postModal.postId!,
      disable: !postModal.commentsDisabled,
    });
    postModal.toggle();
    router.refresh();
  };

  const handleToggleLikeCount = async () => {
    await handleHideLikes({
      postId: postModal.postId!,
      hide: !postModal.hideLikes,
    });
    postModal.toggle();
    router.refresh();
  };

  return (
    <Modal
      isOpen={postModal.isOpen}
      toggle={postModal.toggle}
      title="Post Settings"
    >
      <ul className="flex flex-col gap-3">
        <li
          className="py-2 border-b border-[#eee] text-red-700 hover:text-red-700/50 cursor-pointer"
          onClick={handleDelete}
        >
          <span>Delete</span>
        </li>
        <li className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer">
          <span>Edit post</span>
        </li>
        {postModal.hideLikes ? (
          <li
            className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
            onClick={handleToggleLikeCount}
          >
            <span>Show like count</span>
          </li>
        ) : (
          <li
            className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
            onClick={handleToggleLikeCount}
          >
            <span>Hide like count</span>
          </li>
        )}
        {postModal.commentsDisabled ? (
          <li
            className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
            onClick={handleToggleDisableComments}
          >
            <span>Turn on commenting</span>
          </li>
        ) : (
          <li
            className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
            onClick={handleToggleDisableComments}
          >
            <span>Turn off commenting</span>
          </li>
        )}
        <li
          className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
          onClick={handleGoToPost}
        >
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
