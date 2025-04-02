import React from "react";
import styles from "./PhotoUpload.module.scss";

interface PhotoUploadPreviewProps {
  file: File;
}

const PhotoUploadPreview: React.FC<PhotoUploadPreviewProps> = ({ file }) => {
  const [image, setImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className={styles.photoPreview}>
      <img src={image} alt="Uploaded" className={styles.profilePhoto} />
      <button className={styles.removeButton} onClick={removeImage}>
        <img src="/asserts/trash.svg" alt="Remove" width={16} height={16} />
      </button>
    </div>
  );
};

export default PhotoUploadPreview;
