import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { editUser } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type UseUploadType = {
  endpoint: "avatarUploader" | "postMediaUploader";
  toggleModal?: () => void;
};

export default function useUpload({ endpoint, toggleModal }: UseUploadType) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  // const session = await getServerSession(authOptions);
  const session = { user: { username: "dani" } };

  const router = useRouter();

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: async (data) => {
        if (!data || !session) return;
        // console.log(data);

        try {
          // Change user avatar
          if (endpoint === "avatarUploader") {
            await editUser(session.user.username, {
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
