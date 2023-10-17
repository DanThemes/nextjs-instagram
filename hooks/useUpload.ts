import { editUser } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type UseUploadType = {
  userId?: Types.ObjectId;
  endpoint: "avatarUploader" | "postMediaUploader";
  toggleModal?: () => void;
};

export default function useUpload({
  userId,
  endpoint,
  toggleModal,
}: UseUploadType) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  // TODO: get the session somehow or pass it as an argument to useUpload
  // const session = await getServerSession(authOptions);

  const router = useRouter();

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: async (data) => {
        if (!data || !userId) return;
        // console.log(data);

        try {
          // Change user avatar
          if (endpoint === "avatarUploader") {
            await editUser(userId, {
              profileImage: data[0].url,
            });
          }

          // Add post media
          if (endpoint === "postMediaUploader") {
          }

          setFiles(null);

          if (toggleModal) {
            toggleModal();
          }

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

  return {
    files,
    setFiles,
    startUpload,
    isUploading,
    permittedFileInfo,
  };
}
