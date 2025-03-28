"use client";

import React, { useState } from "react";
import styles from "../PhotoUpload/PhotoUpload.module.scss";

const ProfilePhotoUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className={styles.profilePhotoUploader}>
      {!image ? (
        <label className={styles.uploadBox}>
          <img src="/asserts/photo.svg" alt="Upload Camera" width={24} height={24} />
          <span>ატვირთეთ ფოტო</span>
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>
      ) : (
        <div className={styles.photoPreview}>
          <img src={image} alt="Uploaded" className={styles.profilePhoto} />
          <button className={styles.removeButton} onClick={removeImage}>
            <img src="/asserts/trash.svg" alt="Remove" width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
