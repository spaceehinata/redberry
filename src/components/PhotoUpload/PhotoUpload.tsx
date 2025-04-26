import React, { useState } from "react";
import styles from "./PhotoUpload.module.scss";
import PhotoUploadPreview from "./PhotoUploadPreview";
import Image from "next/image";  // Import the Image component from next/image

interface ProfilePhotoUploaderProps {
  onPhotoChange: (file: File) => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  onPhotoChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // File type validation
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        setSelectedFile(null);
        return;
      }

      // File size validation (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        setSelectedFile(null);
        return;
      }

      setError(null); // Clear error if the file is valid
      setSelectedFile(file); // Store the File object
      onPhotoChange(file); // Pass the File to the parent
    }
  };

  return (
    <div className={styles.profilePhotoUploader}>
      {error && <div className={styles.error}>{error}</div>}
      {!selectedFile ? (
        <label className={styles.uploadBox}>
          {/* Use the Image component here for better performance */}
          <Image
            src="/asserts/photo.svg"
            alt="Upload Camera"
            width={24}
            height={24}
          />
          <span>ატვირთეთ ფოტო</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </label>
      ) : (
        <PhotoUploadPreview file={selectedFile} />
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
