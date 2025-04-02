import React from "react";
import styles from "./Button2.module.scss";

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button2 = ({
  onClick,
  disabled = false,
  children = "თანამშრომლის შექმნა",
}: Props) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button2;