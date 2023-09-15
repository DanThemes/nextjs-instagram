"use client";

import React from "react";
import Modal from "./modal";
import { useSession } from "next-auth/react";
import useNewPostModal from "@/hooks/useNewPostModal";
import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import useUpload from "@/hooks/useUpload";

export default function NewPostModal() {
  const newPostModal = useNewPostModal();
  const { data: session } = useSession();

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

  const { files, setFiles, startUpload, isUploading, uploadedData } = useUpload(
    {
      endpoint: "postMediaUploader",
      toggleModal: newPostModal.toggle,
    }
  );

  if (!session) {
    return null;
  }

  const onSubmit = (data: FieldValues) => {
    console.log({ data });

    // setFiles(data.media);
    startUpload(data.media);
  };

  console.log({ errors });

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
              {...register("media", {
                required: "Please attach one or more images/videos",
                onChange: (e) => {
                  setFiles(e.target.files);
                },
              })}
              className="hidden"
            />
            <label htmlFor="avatar-uploader" className="gray_button">
              Choose an image
            </label>
          </div>
          {/* <div className="flex gap-5">
          {files &&
            files.map((file) => (
              <div
                key={file.name}
                className="relative my-10 shadow-lg rounded-lg"
              >
                <div
                  onClick={clearFiles}
                  className="bg-black w-5 h-5 rounded-full text-white flex items-center justify-center font-bold cursor-pointer active:opacity-50 absolute right-2 top-2"
                >
                  <GoX />
                </div>
                <Image
                  src={URL.createObjectURL(file)}
                  width="100"
                  height="100"
                  className="rounded-lg"
                  alt="new avatar preview"
                />
              </div>
            ))}
        </div>
        {files && (
          <button
            disabled={isUploading}
            className="blue_button ml-auto"
            onClick={() => files && session && startUpload(files)}
          >
            Upload
          </button>
        )} */}
          <div>
            <input
              type="text"
              id="caption"
              placeholder="Caption..."
              {...register("caption", {
                required: "Please enter a caption",
                maxLength: 1000,
              })}
            />
            {errors.caption && <p>{errors.caption.message}</p>}
          </div>

          <div>
            <button type="submit" className="blue_button">
              Add post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
