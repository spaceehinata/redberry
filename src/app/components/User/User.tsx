import React from "react";
import styles from "./User.module.scss";

const User = ({ name = "თამარ კვანტალია", image }) => {
  return (
    <div className={styles.userCard}>
      {image && (
        <div className={styles.userImage}>
          <img src={image} alt={name || "User Image"} />
        </div>
      )}
      <p className={styles.userName}>{name}</p>
    </div>
  );
};

export default User;
