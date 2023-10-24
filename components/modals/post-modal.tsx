"use client";

import React from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import usePostModal from "@/hooks/usePostModal";
import { deletePost, disableComments, handleHideLikes } from "@/utils/api";
import { useRouter } from "next/navigation";
import useEditPostModal from "@/hooks/useEditPostModal";
import { MediaType } from "@/models/Media";

export default function PostModal() {
  const postModal = usePostModal();
  const editPostModal = useEditPostModal();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return null;
  }

  if (!postModal.post) {
    return null;
  }

  console.log({ postModal });

  const handleEditPost = (post: {
    _id: string;
    caption: string;
    media: MediaType[];
  }) => {
    if (!postModal.post) return;

    postModal.toggle();
    editPostModal.setPost(post);
    editPostModal.toggle();
  };

  const handleDelete = async () => {
    if (!postModal.post) return;

    await deletePost(postModal.post._id.toString());
    postModal.toggle();
    router.refresh();
  };

  const handleGoToPost = async () => {
    if (!postModal.post) return;

    postModal.toggle();
    router.push(`/posts/${postModal.post._id}`);
  };

  const handleToggleDisableComments = async () => {
    if (!postModal.post) return;

    await disableComments({
      postId: postModal.post._id,
      disable: !postModal.commentsDisabled,
    });
    postModal.toggle();
    router.refresh();
  };

  const handleToggleLikeCount = async () => {
    if (!postModal.post) return;

    await handleHideLikes({
      postId: postModal.post._id,
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
      <ul className="flex flex-col">
        <li
          className="py-2 border-b border-[#eee] text-red-700 hover:text-red-700/50 cursor-pointer"
          onClick={handleDelete}
        >
          <span>Delete</span>
        </li>
        <li
          className="py-2 border-b border-[#eee] text-black hover:text-black/50 cursor-pointer"
          onClick={() => postModal.post && handleEditPost(postModal.post)}
        >
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
