"use client";

import React from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { GoSync } from "react-icons/go";
import useAuthModal from "@/hooks/useAuthModal";

export default function AuthModal() {
  const authModal = useAuthModal();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      displayName: "",
    },
  });

  if (session) {
    return null;
  }

  const onSubmit = async (data: FieldValues) => {
    // const newPost = await addPost({
    //   userId: session.user.id,
    //   media: mediaIds,
    //   caption: data.caption,
    //   comments: [],
    //   likes: [],
    // } as any);
  };
  console.log({ errors });

  return (
    <Modal isOpen={true} toggle={authModal.toggle} title="Login">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Please enter an email address",
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("displayName", {
                required: "Please enter a full name",
              })}
            />
            {errors.displayName && <p>{errors.displayName.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="blue_button"
              disabled={isSubmitting}
            >
              Add post
              {isSubmitting && (
                <div className="animate-spin">
                  <GoSync />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
