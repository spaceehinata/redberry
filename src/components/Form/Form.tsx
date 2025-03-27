"use client";
import { useState } from "react";
import styles from "./Form.module.scss"; 
import DepartmentDropdown from "../DepartmentDropDown/DepartmentDropdown";

const InputField = ({ label }: { label: string }) => {
  const [value, setValue] = useState("");
  const isValid = value.length >= 2 && value.length <= 255;

  return (
    <div className={styles.inputContainer}>
      <label>{label}*</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={isValid || value.length === 0 ? styles.valid : styles.invalid}
        />
        <img src="/asserts/information.svg" alt="info" className={styles.infoIcon} />
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

export default function Form() {
  return (
    <div className={styles.formContainer}>
      <InputField label="სახელი" />
      <InputField label="სახელი" />
      <InputField label="სახელი" />
      <InputField label="სახელი" />
      <DepartmentDropdown />
    </div>
  );
}
