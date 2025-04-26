"use client";
import React from "react";
import Image from "next/image";
import styles from "./Name.module.scss";

interface NameInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({ label, value, onChange }) => {
  const isValid = value.length >= 2 && value.length <= 255;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={
            value.length === 0 ? "" : isValid ? styles.valid : styles.invalid
          }
          required
        />
      </div>
      <div className={styles.validation}>
        <div className={styles.validationItem}>
          <Image
            src={
              value.length === 0
                ? "/asserts/checkGr.svg"
                : value.length >= 2
                ? "/asserts/check.svg"
                : "/asserts/checkRed.svg"
            }
            alt="status"
            width={16}
            height={16}
          />
          <span>მინიმუმ 2 სიმბოლო</span>
        </div>
        <div className={styles.validationItem}>
          <Image
            src={
              value.length === 0
                ? "/asserts/checkGr.svg"
                : value.length <= 255
                ? "/asserts/check.svg"
                : "/asserts/checkRed.svg"
            }
            alt="status"
            width={16}
            height={16}
          />
          <span>მაქსიმუმ 255 სიმბოლო</span>
        </div>
      </div>
    </div>
  );
};

export default NameInput;
