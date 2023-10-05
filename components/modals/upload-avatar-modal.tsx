"use client";

import React from "react";
import Modal from "./modal";
import useUploadAvatarModal from "@/hooks/useUploadAvatarModal";
import { useSession } from "next-auth/react";
import useUpload from "@/hooks/useUpload";
import Image from "next/image";
import { GoSync, GoX } from "react-icons/go";

export default function UploadAvatarModal() {
  const uploadAvatarModal = useUploadAvatarModal();
  const { data: session, update } = useSession();

  const { files, setFiles, startUpload, isUploading } = useUpload({
    userId: session?.user.id,
    endpoint: "avatarUploader",
    toggleModal: uploadAvatarModal.toggle,
  });

  if (!session) {
    return null;
  }

  const handleSetAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isUploading) return;
    console.log(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFiles(filesArray);
    }
  };

  const handleUpload = async () => {
    if (!files || !session) {
      return;
    }
    const f = await startUpload(files);
    console.log({ f });
    // check if the uploaded file URL is in the "f" object
    // and replace "test" below with it
    update({ profileImage: "test" });
  };

  const clearFiles = () => {
    setFiles(null);
  };

  return (
    <Modal
      isOpen={uploadAvatarModal.isOpen}
      toggle={uploadAvatarModal.toggle}
      title="Change Profile Photo"
    >
      <div>
        <input
          id="avatar-uploader"
          type="file"
          accept=".jpg, .JPG, .jpeg, .JPEG, .png, .PNG, .gif, .GIF"
          disabled={isUploading}
          onChange={handleSetAvatar}
          className="hidden"
        />
        <label htmlFor="avatar-uploader" className="gray_button">
          Choose an image
        </label>
        <div className="flex gap-5">
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
            onClick={handleUpload}
          >
            Upload
            {isUploading && (
              <div className="animate-spin">
                <GoSync />
              </div>
            )}
          </button>
        )}
      </div>
    </Modal>
  );
}
