import React, { useState } from "react";
import { useMutation } from "react-query";
import { getProfileImageUploadPolicy } from "@/apis/auth";
import axios from "axios";
import { toast } from "react-toastify";
import OutlinedButton from "./Button/OutlinedButton";

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void;
  uploadType?: string;
}

function ImageUploader({ onUpload, uploadType }: ImageUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fetchPolicy = useMutation(
    async (extension?: string) => {
      const { data } = await getProfileImageUploadPolicy({
        uploadType,
        extension,
      });
      return data as { url: string; fields: Record<string, string> };
    },
    {
      onSuccess: (data) => console.log("Policy fetched: ", data),
      onError: (error) => console.log("Error fetching policy: ", error),
    }
  );
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    const fileExtension = file.name.split(".").pop();

    // Fetch the policy
    const policy = await fetchPolicy.mutateAsync(fileExtension);

    // Create a FormData instance
    const formData = new FormData();

    // Add the fields to the FormData instance
    Object.entries(policy.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append the file to FormData
    formData.append("file", file);
    setIsUploading(true);

    // Upload the file
    axios
      .post(policy.url, formData, {
        onUploadProgress: (progressEvent) => {
          let progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          setUploadProgress(progress);
        },
      })
      .then(() => {
        setIsUploading(false);
        onUpload(`${policy.url}${policy.fields.key}`); // Call the onUpload function with the URL
        toast.success("File uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        setIsUploading(false);
        toast.error("Error uploading file");
      });
  };
  return (
    <div>
      <input type="file" className="hidden" onChange={handleFileChange} />
      <div className="hidden" id="photoUrl"></div>
      <OutlinedButton
        label="Upload Photo"
        onClick={() => {
          const fileInput = document.querySelector("input[type=file]");
          fileInput?.click();
        }}
      />
    </div>
  );
}

export default ImageUploader;
