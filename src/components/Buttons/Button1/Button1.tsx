import React from "react";
import styles from "./Button1.module.scss";

type Props = {
  text: string;
};

const Button1 = ({ text }: Props) => {
  return <div className={styles.button}>{text}</div>;
};

export default Button1;
