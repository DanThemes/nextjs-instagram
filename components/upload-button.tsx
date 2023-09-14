"use client";

import { editUser } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoX } from "react-icons/go";
import { utapi } from "uploadthing/server";

type UploadButtonProps = {
  size: "small" | "large";
  endpoint: any; // setting this to string raises a warning...
  idOrUsername: string;
  profileImage?: string;
};

export default function UploadButton({
  size = "small",
  endpoint,
  idOrUsername,
  profileImage,
}: UploadButtonProps) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  const router = useRouter();

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: async (data) => {
        if (!data) return;

        console.log({ idOrUsername });

        try {
          // Upload new avatar
          await editUser(idOrUsername, { profileImage: data[0].url });

          // Delete old avatar
          if (profileImage) {
            // console.log({ profileImage });
          }

          setFiles(null);
          router.refresh();
        } catch (error) {
          console.log(error);
          // setError(error);
        }
      },
      onUploadError: (error) => {
        console.log(error);
        setError(error);
      },
      onUploadBegin: () => {
        setError(null);
        console.log("upload has begun");
      },
    }
  );

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
    <div>
      {/* make this a component and the logic into a hook */}
      <input
        id="avatar-uploader"
        type="file"
        onChange={handleUpload}
        className="hidden"
      />
      <label htmlFor="avatar-uploader" className="gray_button">
        Choose an image
      </label>
      <div className="flex">
        {files &&
          files.map((file) => (
            <div key={file.name} className="relative my-10">
              <div
                onClick={clearFiles}
                className="bg-black w-5 h-5 rounded-full text-white flex items-center justify-center font-bold cursor-pointer active:opacity-50 absolute -right-7 top-0"
              >
                <GoX />
              </div>
              <Image
                src={URL.createObjectURL(file)}
                width="100"
                height="100"
                alt="new avatar preview"
              />
            </div>
          ))}
      </div>
      {files && (
        <button
          className="blue_button ml-auto"
          onClick={() => files && startUpload(files)}
        >
          Upload
        </button>
      )}
    </div>
  );
}
