"use client";
import React from "react";
import styles from "./TextArea.module.scss";

interface TextareaProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ label, value, onChange }) => {
  const isValid = value.length >= 2 && value.length <= 255;

  return (
    <div className={styles.textareaContainer}>
      {label && <label>{label}</label>}
      <div className={styles.textareaWrapper}>
        <textarea
          value={value}
          onChange={onChange}
          className={isValid || value.length === 0 ? styles.valid : styles.invalid}
          required
        />
      </div>
      <div className={styles.validation}>
        <div className={styles.validationItem}>
          <img
            src={
              value.length === 0
                ? "/asserts/checkGr.svg"
                : value.length >= 2
                ? "/asserts/check.svg"
                : "/asserts/checkRed.svg"
            }
            alt="status"
          />
          <span>მინიმუმ 2 სიმბოლო</span>
        </div>
        <div className={styles.validationItem}>
          <img
            src={
              value.length === 0
                ? "/asserts/checkGr.svg"
                : value.length <= 255
                ? "/asserts/check.svg"
                : "/asserts/checkRed.svg"
            }
            alt="status"
          />
          <span>მაქსიმუმ 255 სიმბოლო</span>
        </div>
      </div>
    </div>
  );
};

export default Textarea;