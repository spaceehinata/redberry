import React, { useState } from "react";
import styles from "./PhotoUpload.module.scss";
import PhotoUploadPreview from "./PhotoUploadPreview";

interface ProfilePhotoUploaderProps {
  onPhotoChange: (file: File) => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  onPhotoChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file); // Store the File object
      onPhotoChange(file); // Pass the File to the parent
    }
  };

  return (
    <div className={styles.profilePhotoUploader}>
      {!selectedFile ? (
        <label className={styles.uploadBox}>
          <img
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
