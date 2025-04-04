// pages/AddTask.tsx
"use client";
import React from "react";
import styles from "./addtask.module.scss";

const addtask = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>დავალების შექმნა</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="taskName" className={styles.label}>
            დავალების სახელი
          </label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            className={styles.input}
            placeholder="მიუთითეთ დავალების სახელი"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="taskDescription" className={styles.label}>
            დავალების აღწერა
          </label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            className={styles.input}
            placeholder="მიუთითეთ დავალების აღწერა"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          შექმენი დავალება
        </button>
      </form>
    </div>
  );
};

export default addtask;
