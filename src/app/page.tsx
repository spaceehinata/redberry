"use client";
import React from "react";
import Task from "@/app/components/Task/Task";
import styles from "./page.module.css";
import DatePicker from "./components/GiolaCal/DatePicker";
import Dropdown from "./components/Dropdown/Dropdown";
import Header from "./components/Header/Header";

export default function Page() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <h1 className={styles.title}>დავალებების გვერდი</h1>
      <Dropdown />
      <div className={styles.taskWrapper}>
        <Task showAll={true} />
      </div>
      {/* <DatePicker /> */}
    </div>
  );
}

