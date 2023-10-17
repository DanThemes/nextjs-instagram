"use client";

import React, { forwardRef } from "react";
import { CommentType, PopulatedCommentType } from "@/models/Comment";
import { UserType } from "@/models/User";
import PostComment from "./post-comment";
import PostCommentInput from "./post-comment-input";
import { useForm } from "react-hook-form";
import { Types } from "mongoose";
import { PopulatedPostType } from "@/models/Post";

type Props = {
  postId: Types.ObjectId;
  commentsDisabled: boolean;
  comments: PopulatedCommentType[];
  userId?: Types.ObjectId;
};

const PostComments = forwardRef<HTMLInputElement, Props>(function PostComments(
  { postId, commentsDisabled, comments, userId },
  ref
) {
  // {
  //     register,
  //     handleSubmit,
  //     setValue,
  //     getValues,
  //     setFocus,
  //     formState: { errors, isSubmitting },
  //     reset,
  //   }
  const form = useForm({
    defaultValues: {
      text: "",
      parentCommentId: "",
    },
  });

  return (
    <>
      {comments && (
        <div className="flex flex-col gap-3 mt-3">
          {comments
            .filter((comment) => comment.parentCommentId === null)
            .map((comment) => (
              <div key={comment._id.toString()}>
                <PostComment
                  comment={comment}
                  userId={userId}
                  replies={comments.filter(
                    (c) => c.parentCommentId === comment._id
                  )}
                  setValue={form.setValue}
                  ref={ref}
                />
              </div>
            ))}
        </div>
      )}

      {userId && commentsDisabled && (
        <p className="italic mt-3 text-sm">New comments are not allowed.</p>
      )}

      {userId && !commentsDisabled && (
        <PostCommentInput
          postId={postId}
          userId={userId}
          form={form}
          ref={ref}
        />
      )}
    </>
  );
});
export default PostComments;
