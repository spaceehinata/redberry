"use client";
import React from "react";
import Task from "@/app/components/Task/Task";
import styles from "./page.module.css";
import DatePicker from "./components/GiolaCal/DatePicker";
import Dropdown from "./components/Dropdown/Dropdown";

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <h1>All Tasks</h1>
      <div className={styles.taskWrapper}>
        <Task showAll={true} />
      </div>
      <DatePicker />
      {/* <Dropdown /> */}
    </div>
  );
}

