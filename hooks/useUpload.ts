import { editUser } from "@/utils/api";
import { useUploadThing } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type UseUploadType = {
  endpoint: "avatarUploader" | "postMediaUploader";
  postId?: string;
  toggleModal?: () => void;
};

export default function useUpload({
  endpoint,
  postId,
  toggleModal,
}: UseUploadType) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [uploadedData, setUploadedData] = useState<string[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  const { data: session } = useSession();

  const router = useRouter();

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: async (data) => {
        if (!data) return;
        console.log(data);

        try {
          if (!session) {
            return null;
          }

          // Change user avatar
          if (endpoint === "avatarUploader") {
            await editUser(session.user.username, {
              profileImage: data[0].url,
            });
          }

          // Add post media
          if (endpoint === "postMediaUploader") {
            if (!postId) {
              return null;
            }

            setUploadedData(data.map((item) => item.url));

            // await editPost(session.user.username, {
            //   profileImage: data[0].url,
            // });
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
    uploadedData,
    permittedFileInfo,
  };
}
