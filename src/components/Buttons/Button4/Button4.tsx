import React from "react";
import styles from "./Button4.module.scss";

type Props = {
  onClick: () => void; // Accept the onClick handler as a prop
};

const Button4 = ({ onClick }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}>
      {" "}
      {/* Call the onClick handler when clicked */}
      <img src="/asserts/Left 2.svg" alt="arrow" />
      უპასუხე
    </div>
  );
};

export default Button4;
