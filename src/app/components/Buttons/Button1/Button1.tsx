// Button1.tsx
import React from "react";
import styles from "./Button1.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button1: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button1;
