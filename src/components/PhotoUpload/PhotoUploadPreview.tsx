import React from "react";
import styles from "./PhotoUpload.module.scss";
import Image from "next/image";  // Import Image from next/image

interface PhotoUploadPreviewProps {
  file: File;
}

const PhotoUploadPreview: React.FC<PhotoUploadPreviewProps> = ({ file }) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const reader = new FileReader();

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    reader.onerror = () => {
      setError("Failed to load image.");
    };

    reader.readAsDataURL(file);

    // Cleanup function to remove the image when the component unmounts
    return () => {
      setImage(null);
      setError(null);
    };
  }, [file]);

  const removeImage = () => {
    setImage(null);
    setError(null); // Clear error when removing the image
  };

  return (
    <div className={styles.photoPreview}>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        image && (
          <Image
            src={image}
            alt="Uploaded"
            className={styles.profilePhoto}
            width={100} // Define a width
            height={100} // Define a height
          />
        )
      )}
      <button className={styles.removeButton} onClick={removeImage}>
        <Image
          src="/asserts/trash.svg"
          alt="Remove"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};

export default PhotoUploadPreview;
