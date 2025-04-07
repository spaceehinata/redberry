// Button3.tsx
import React from "react";
import styles from "./Button3.module.scss";

type Button3Props = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button3 = ({ text, onClick, disabled }: Button3Props) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button3;
