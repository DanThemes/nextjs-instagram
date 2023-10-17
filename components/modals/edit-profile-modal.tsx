"use client";

import React, { useEffect } from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { GoSync, GoX } from "react-icons/go";
import { useRouter } from "next/navigation";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import { editUser, getUser } from "@/utils/api";

export default function EditProfileModal() {
  const editProfileModal = useEditProfileModal();
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    trigger,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      displayName: "",
      bio: "",
    },
  });

  useEffect(() => {
    (async () => {
      if (!session) return;

      const user = await getUser(session?.user.username);
      console.log({ user });
      setValue("displayName", user.displayName);
      setValue("bio", user.bio);
    })();
  }, [session, setValue]);

  if (!session) {
    return null;
  }

  const onSubmit = async (data: FieldValues) => {
    // Edit profile
    await editUser(session.user.id, {
      displayName: data.displayName,
      bio: data.bio,
    } as any);

    editProfileModal.toggle();
    router.refresh();
  };

  return (
    <Modal
      isOpen={editProfileModal.isOpen}
      toggle={editProfileModal.toggle}
      title="Edit Profile"
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="display-name">Display name:</label>
            <input
              id="display-name"
              placeholder="Display name"
              className="border px-3 py-2 rounded-md w-full disabled:opacity-50"
              disabled={isSubmitting}
              {...register("displayName")}
            />
            {errors.displayName && (
              <p>{errors.displayName.message as string}</p>
            )}
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              placeholder="Bio..."
              className="border px-3 py-2 rounded-md w-full disabled:opacity-50"
              disabled={isSubmitting}
              {...register("bio")}
            />
            {errors.caption && <p>{errors.caption.message as string}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="blue_button"
              disabled={isSubmitting}
            >
              Edit profile
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
