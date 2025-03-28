"use client";
import React from "react";
import Task from "@/app/components/Task/Task";
import styles from "./page.module.css";
import DatePicker from "./components/GiolaCal/DatePicker";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={styles.pageContainer}>
      <h1>Task Details</h1>
      <div className={styles.taskWrapper}>
        <Task taskId={params?.id} />
      </div>
      <DatePicker />
    </div>
  );
}
