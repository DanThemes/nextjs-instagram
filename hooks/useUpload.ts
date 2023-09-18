import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { editUser } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type UseUploadType = {
  username?: string;
  endpoint: "avatarUploader" | "postMediaUploader";
  toggleModal?: () => void;
};

export default function useUpload({
  username,
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
        if (!data || !username) return;
        // console.log(data);

        try {
          // Change user avatar
          if (endpoint === "avatarUploader") {
            await editUser(username, {
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
