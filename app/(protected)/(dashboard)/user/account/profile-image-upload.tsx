"use client";

import { UploadButton } from "@uploadthing/react";
import { saveProfileImage } from "@/actions/user";
import { useState, useTransition } from "react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useRouter } from "next/navigation";

export default function ProfileImageUpload() {
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const isDisabled = isPending || uploading;
  const buttonText = isDisabled ? "Saving..." : "Change Profile Image";

  return (
    <UploadButton<OurFileRouter, "profileImage">
      endpoint="profileImage"
      appearance={{
        button: isDisabled
          ? {
              opacity: 0.6,
              color: "#4b5563",
              cursor: "not-allowed",
            }
          : {
              paddingLeft: "10px",
              paddingRight: "10px",
              color: "black",
              border: "2px solid black",
            },
        container: "w-fit flex flex-col items-center gap-2",
        allowedContent: "text-xs text-muted-foreground mt-2",
      }}
      content={{
        button: buttonText,
      }}
      disabled={isDisabled}
      onUploadBegin={() => {
        setUploading(true);
      }}
      onClientUploadComplete={(res) => {
        const url = res?.[0]?.ufsUrl;
        if (!url) return;

        startTransition(() => {
          setUploading(false);
          saveProfileImage(url);
          router.refresh();
        });
      }}
      onUploadError={(err) => {
        setUploading(false);
        alert("Upload failed: " + err.message);
      }}
    />
  );
}
