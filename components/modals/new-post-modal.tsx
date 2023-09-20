"use client";

import React, { useState } from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import useNewPostModal from "@/hooks/useNewPostModal";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import useUpload from "@/hooks/useUpload";
import { GoSync, GoX } from "react-icons/go";
import { addPost, addPostMedia } from "@/utils/api";
import { MediaType } from "@/models/Media";
import { useRouter } from "next/navigation";

export default function NewPostModal() {
  const [localMedia, setLocalMedia] = useState<File[]>([]);
  const newPostModal = useNewPostModal();
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      media: [],
      caption: "",
    },
  });

  const { files, setFiles, startUpload, isUploading } = useUpload({
    endpoint: "postMediaUploader",
    toggleModal: newPostModal.toggle,
  });

  if (!session) {
    return null;
  }

  const onSubmit = async (data: FieldValues) => {
    if (isUploading) return;

    const media = await startUpload(localMedia);

    const formattedMedia = media?.map((item) => {
      const isImage = item.url.match(/\.(jpeg|jpg|gif|png)$/i) != null;
      return {
        type: isImage ? "image" : "video",
        url: item.url,
      };
    }) as MediaType[];

    const mediaIds: string[] = [];

    await Promise.all(
      formattedMedia.map(async (media) => {
        const resp = await addPostMedia(media);
        // TODO: show error message for files which exceed size limit
        console.log({ resp, respId: resp._id });
        mediaIds.push(resp._id);
      })
    );
    console.log({ mediaIds });

    await addPost({
      userId: session.user.id,
      media: mediaIds,
      caption: data.caption,
      comments: [],
      likes: [],
    } as any);

    newPostModal.toggle();
    reset();
    router.refresh();
    // TODO: redirect to newly created post
  };

  const handleLocalMedia = (media: FileList) => {
    if (isUploading) return;
    const mediaArray = Array.from(media);
    console.log({ mediaArray });
    setLocalMedia((prev) => {
      const newLocalMedia = [...prev, ...mediaArray];
      setFiles(newLocalMedia);
      return newLocalMedia;
    });
  };

  const handleRemoveFromLocalMedia = (index: number) => {
    if (isUploading) return;
    setLocalMedia((prev) => {
      const newLocalMedia = prev.filter((item, i) => i !== index);
      setFiles(newLocalMedia);
      return newLocalMedia;
    });
  };

  console.log({ localMedia, files });

  return (
    <Modal
      isOpen={newPostModal.isOpen}
      toggle={newPostModal.toggle}
      title="Add New Post"
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
                required: "Please attach one or more images/videos",
                onChange: (e) => {
                  handleLocalMedia(e.target.files);
                },
              })}
              className="hidden"
            />
            <label htmlFor="avatar-uploader" className="gray_button">
              Choose an image/video
            </label>
          </div>
          <div className="flex gap-5">
            {localMedia &&
              Array.from(localMedia as File[]).map((file, index) => (
                <div
                  key={file.name}
                  className="relative my-10 shadow-lg rounded-lg"
                >
                  <div
                    onClick={() => handleRemoveFromLocalMedia(index)}
                    className="bg-black w-5 h-5 rounded-full text-white flex items-center justify-center font-bold cursor-pointer active:opacity-50 absolute right-2 top-2"
                  >
                    <GoX />
                  </div>
                  <Image
                    src={URL.createObjectURL(file)}
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
            {errors.caption && <p>{errors.caption.message}</p>}
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
