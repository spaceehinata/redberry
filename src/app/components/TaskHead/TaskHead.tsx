"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./TaskHead.module.scss";

export enum TaskColor {
  Yellow = "yellow",
  Red = "red",
  Pink = "pink",
  Blue = "blue",
}

interface StatusData {
  id: number;
  name: string;
}

type TaskHeadProps = {
  color: TaskColor;
  text: string;
};

const TaskHead = ({ color, text }: TaskHeadProps) => {
  return <div className={clsx(styles.header, styles[color])}>{text}</div>;
};

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const TaskHeadWrapper = () => {
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(`${API_URL}/statuses`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch statuses");
        }

        const statusesData = await response.json();
        setStatuses(statusesData);
        console.log("Statuses fetched:", statusesData);
      } catch (err: unknown) {
        // Type assertion to Error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  const getStatusColor = (statusName: string): TaskColor => {
    switch (statusName) {
      case "დასაწყები":
        return TaskColor.Yellow;
      case "პროცესში":
        return TaskColor.Red;
      case "მზად ტესტირებისთვის":
        return TaskColor.Pink;
      case "დასრულებული":
        return TaskColor.Blue;
      default:
        console.log("Unmatched status:", statusName);
        return TaskColor.Red; 
    }
  };

  if (loading) return <div>Loading statuses...</div>;
  if (error) return <div>Error: {error}</div>;
  if (statuses.length === 0) return <div>No statuses available</div>;

  return (
    <div className={styles["header-wrapper"]}>
      {statuses.map((status) => (
        <TaskHead
          key={status.id}
          color={getStatusColor(status.name)}
          text={status.name}
        />
      ))}
    </div>
  );
};

export default TaskHeadWrapper;
