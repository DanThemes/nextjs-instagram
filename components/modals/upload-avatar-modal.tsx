"use client";

import React from "react";
import Modal from "./modal";
import useUploadAvatarModal from "@/hooks/useUploadAvatarModal";
import { useSession } from "next-auth/react";
import useUpload from "@/hooks/useUpload";
import Image from "next/image";
import { GoX } from "react-icons/go";

export default function UploadAvatarModal() {
  const uploadAvatarModal = useUploadAvatarModal();
  const { data: session } = useSession();

  const { files, setFiles, startUpload, isUploading, uploadedData } = useUpload(
    {
      endpoint: "avatarUploader",
      toggleModal: uploadAvatarModal.toggle,
    }
  );

  if (!session) {
    return null;
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFiles(filesArray);
    }
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
          onChange={handleUpload}
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
            onClick={() => files && session && startUpload(files)}
          >
            Upload
          </button>
        )}
      </div>
    </Modal>
  );
}
