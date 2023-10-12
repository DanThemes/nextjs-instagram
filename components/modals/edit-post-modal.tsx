"use client";

import React, { useCallback, useEffect, useState } from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import useUpload from "@/hooks/useUpload";
import { GoSync, GoX } from "react-icons/go";
import { addPost, addPostMedia } from "@/utils/api";
import { MediaType } from "@/models/Media";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useEditPostModal from "@/hooks/useEditPostModal";

const validateFileSizes = (files: any[]) => {
  if (!files.length) {
    return "Please attach one or more images/videos";
  }
  if (Array.from(files).some((file) => file.size > 4 * 1024 * 1024)) {
    return "File size limit is 4MB for images and 64MB for videos. Files over the allowed size limit have been removed.";
  }
  return true;
};

const maxImageFileSize = 4 * 1024 * 1024;
const maxVideoFileSize = 64 * 1024 * 1024;

export default function EditPostModal() {
  const [localMedia, setLocalMedia] = useState<any[]>([]);
  const editPostModal = useEditPostModal();
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    trigger,
    clearErrors,
    formState: { errors },
    reset,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      media: [],
      caption: "",
    },
  });

  const { files, setFiles, startUpload, isUploading } = useUpload({
    userId: session?.user.id,
    endpoint: "postMediaUploader",
    toggleModal: editPostModal.toggle,
  });

  const onSubmit = async (data: FieldValues) => {
    if (isUploading) return;
    // await trigger("media");
    // clearErrors("media");

    // Upload to UploadThing
    setValue("media", localMedia);
    console.log({ onSubmitLocalMedia: localMedia });
    const media = await startUpload(localMedia);

    const formattedMedia = media?.map((item) => {
      const isImage = item.url.match(/\.(jpeg|jpg|gif|png)$/i) != null;
      return {
        type: isImage ? "image" : "video",
        url: item.url,
      };
    }) as MediaType[];

    const mediaIds: string[] = [];

    // Save the media to database
    await Promise.all(
      formattedMedia.map(async (media) => {
        const resp = await addPostMedia(media);
        // TODO: show error message for files which exceed size limit
        console.log({ resp, respId: resp._id });
        mediaIds.push(resp._id);
      })
    );
    console.log({ mediaIds });

    // Save the post
    await addPost({
      userId: session?.user.id,
      media: mediaIds,
      caption: data.caption,
    } as any);

    // newPostModal.toggle();
    reset();
    setLocalMedia([]);
    router.refresh();
    // TODO: redirect to newly created post
  };

  // Store file uploads in order to show a preview of the selected files in the UI
  const handleLocalMedia = useCallback(async (media: any[]) => {
    if (isUploading) return;

    // Trigger validation for "media" field
    await trigger("media");

    let mediaArray = Array.from(media);
    // Keep in local state only media below file size limit
    // let mediaArray = Array.from(media).filter(
    //   (media) => media.size < 4 * 1024 * 1024
    // );

    console.log({ mediaArray });
    setLocalMedia((prev) => {
      const newLocalMedia = [...prev, ...mediaArray];
      setFiles(newLocalMedia);
      setValue("media", newLocalMedia);
      return newLocalMedia;
    });
  }, []);

  const handleRemoveFromLocalMedia = async (index: number) => {
    if (isUploading) return;
    await trigger("media");

    setLocalMedia((prev) => {
      const newLocalMedia = prev.filter((_, i) => i !== index);
      setFiles(newLocalMedia);
      setValue("media", newLocalMedia);
      return newLocalMedia;
    });
  };

  console.log({ media: editPostModal.post });

  useEffect(() => {
    if (!editPostModal.post) return;

    setLocalMedia(() => {
      console.log("effect");
      if (!editPostModal.post) return [];
      const newLocalMedia = editPostModal.post.media || [];
      return newLocalMedia;
    });
  }, [editPostModal.post, setValue]);

  if (!session) {
    return null;
  }

  console.log({ localMedia, watchMedia: watch("media"), errors });

  return (
    <Modal
      isOpen={editPostModal.isOpen}
      toggle={editPostModal.toggle}
      title="Edit Post"
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              id="avatar-uploader"
              type="file"
              multiple
              accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .gif, .GIF, .mp4, .MP4, .webm, .WEBM, .ogg, .OGG"
              disabled={isUploading}
              {...register("media", {
                // required: "Please attach one or more images/videos",
                onChange: (e) => {
                  handleLocalMedia(e.target.files);
                },
                validate: (v) => validateFileSizes(v),
              })}
              className="hidden"
            />
            <label htmlFor="avatar-uploader" className="gray_button">
              Choose an image/video
            </label>
          </div>
          {errors.media && <p>{errors.media.message as string}</p>}
          <div className="flex gap-5">
            {localMedia &&
              Array.from(localMedia as any[]).map((file, index) => (
                <div
                  key={file._id || file.name}
                  className={clsx(
                    "relative my-10 shadow-lg rounded-lg",
                    file.size > maxImageFileSize &&
                      "border-[4px] border-solid border-[red]"
                  )}
                >
                  <div
                    onClick={() => handleRemoveFromLocalMedia(index)}
                    className="bg-black w-5 h-5 rounded-full text-white flex items-center justify-center font-bold cursor-pointer active:opacity-50 absolute right-2 top-2"
                  >
                    <GoX />
                  </div>
                  <Image
                    src={file.url || URL.createObjectURL(file)}
                    width="100"
                    height="100"
                    className="rounded-lg object-cover h-full"
                    alt="new avatar preview"
                  />
                </div>
              ))}
          </div>
          <div>
            <textarea
              placeholder="Caption..."
              className="border px-3 py-2 rounded-md w-full disabled:opacity-50"
              disabled={isUploading}
              {...register("caption", {
                required: "Please enter a caption",
                maxLength: 1000,
              })}
            />
            {errors.caption && <p>{errors.caption.message as string}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="blue_button"
              disabled={isUploading}
            >
              Add post
              {isUploading && (
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
