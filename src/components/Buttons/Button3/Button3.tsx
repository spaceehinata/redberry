import React from "react";
import styles from "./Button3.module.scss";

type Props = {};

const Button2 = (props: Props) => {
  return (
    <div className={styles.button}>
      <p>+</p> შექმენი ახალი დავალება
    </div>
  );
};

export default Button2;