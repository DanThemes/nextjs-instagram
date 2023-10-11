import React, { forwardRef } from "react";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { GoHeart, GoHeartFill } from "react-icons/go";
import UserAvatar from "../user-avatar";
import useUsersModal from "@/hooks/useUsersModal";
import { CommentType } from "@/models/Comment";
import { UserType } from "@/models/User";
import { deleteComment, toggleLike } from "@/utils/api";
import { useRouter } from "next/navigation";
import cn from "@/utils/utils";

type PostCommentType = {
  comment: Omit<CommentType, "userId" | "likes"> & {
    _id: string;
    userId: UserType & { _id: string };
  } & { likes: UserType[] };
  userId?: string;
};

export default forwardRef<HTMLInputElement, PostCommentType>(
  function PostComment({ comment, userId }, ref) {
    const usersModal = useUsersModal();
    const router = useRouter();

    const handleDeleteComment = async (id: string) => {
      if (!userId) return;

      await deleteComment(id);
      router.refresh();
    };

    const handleReply = (username: string, parentCommentId: string) => {
      if (ref && typeof ref !== "function") {
        ref.current?.focus();
      }
      setValue("text", `@${username} `);
      setValue("parentCommentId", parentCommentId);
    };

    const handleToggleLike = async (id: string) => {
      if (!userId) return;

      await toggleLike({
        userId,
        commentId: id,
      });
      router.refresh();
    };

    return (
      <div className="flex gap-3 items-center">
        <div className="flex flex-col gap-2 self-start">
          <UserAvatar
            src={comment.userId.profileImage}
            width={30}
            height={30}
          />
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <div>
            <Link
              href={`/${comment.userId.username}`}
              className="font-bold hover:opacity-50 mr-3"
            >
              {comment.userId.username}
            </Link>

            {comment.text}
          </div>

          <div className="flex gap-3 items-center text-sm">
            <span>
              {formatDistance(new Date(comment.createdAt), new Date())}
            </span>
            <div
              onClick={() => {
                if (!comment.likes.length) return;

                usersModal.setUsers(comment.likes);
                usersModal.setTitle("Likes");
                usersModal.toggle();
              }}
              className={cn({
                "cursor-pointer": comment.likes.length,
              })}
            >
              {comment.likes.length === 1
                ? `1 like`
                : `${comment.likes.length} likes`}
            </div>
            <span
              onClick={() =>
                handleReply(
                  comment.userId.username,
                  comment.parentCommentId?.toString() || comment._id.toString()
                )
              }
              className="cursor-pointer"
            >
              Reply
            </span>
            {comment.userId._id === userId ? (
              <span
                className="text-red-700 cursor-pointer hover:opacity-50"
                onClick={() => handleDeleteComment(comment._id)}
              >
                Delete
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className="flex justify-end hover:opacity-50 active:opacity-30 cursor-pointer"
          onClick={() => handleToggleLike(comment._id)}
        >
          {userId && comment.likes.find((like: any) => like._id === userId) ? (
            <>
              <GoHeartFill />
            </>
          ) : (
            <GoHeart />
          )}
        </div>
      </div>
    );
  }
);
