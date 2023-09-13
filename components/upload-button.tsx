import { useUploadThing } from "@/utils/uploadthing";
import React, { useState } from "react";

type UploadButtonProps = {
  size: "small" | "large";
  endpoint: any; // setting this to string raises a warning...
};

export default function UploadButton({
  size = "small",
  endpoint,
}: UploadButtonProps) {
  const [files, setFiles] = useState<File[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    endpoint,
    {
      onClientUploadComplete: (data) => {
        console.log(data);
        // send a PATCH request to a helper api function from api.ts
        // to edit a user by changing his avatar
        setFiles(null);
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

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <div>
        {files && files.map((file) => <div key={file.name}>{file.name}</div>)}
        {/* TODO: Display a preview of the image before the upload */}
      </div>
      <button
        className="gray_button"
        onClick={() => files && startUpload(files)}
      >
        Upload
      </button>
    </div>
  );
}
