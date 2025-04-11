// Button3.tsx
import React from "react";
import styles from "./Button3.module.scss";

type Button3Props = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Make onClick optional
  disabled?: boolean;
  type?: "submit" | "button" | "reset"; // Add type prop for HTML button types
};

const Button3 = ({
  text,
  onClick,
  disabled,
  type = "button",
}: Button3Props) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button3;
