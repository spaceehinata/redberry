// Button1.tsx
import React from "react";
import styles from "./Button1.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void; // optional, მაგრამ მაინც გამოვიძახებთ მხოლოდ თუ არის
}

const Button1: React.FC<ButtonProps> = ({ text, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button1;
