"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import Image from next/image
import styles from "./Name.module.scss";

const NameInput: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value); // Update state with the new value
  };

  const isValid = name.length >= 2 && name.length <= 255;

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={name} // Bind the value to the state
          onChange={handleChange} // Call handleChange on change
          className={
            name.length === 0 ? "" : isValid ? styles.valid : styles.invalid
          }
          required
        />
      </div>
      <div className={styles.validation}>
        <div className={styles.validationItem}>
          <Image
            src={
              name.length === 0
                ? "/asserts/checkGr.svg"
                : name.length >= 2
                ? "/asserts/check.svg"
                : "/asserts/checkRed.svg"
            }
            alt="status"
            width={16} // Set width
            height={16} // Set height
          />
          <span>მინიმუმ 2 სიმბოლო</span>
        </div>
        <div className={styles.validationItem}>
          <Image
            src={
              name.length === 0
                ? "/asserts/checkGr.svg"
                : name.length <= 255
                ? "/asserts/check.svg"
                : "/asserts/checkRed.svg"
            }
            alt="status"
            width={16} // Set width
            height={16} // Set height
          />
          <span>მაქსიმუმ 255 სიმბოლო</span>
        </div>
      </div>
    </div>
  );
};

export default NameInput;
