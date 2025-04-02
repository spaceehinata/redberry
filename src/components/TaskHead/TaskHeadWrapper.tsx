import React, { useEffect, useState } from "react";
import { fetchStatuses, StatusData } from "@/api/Statuses"; // impoert API
import TaskHead, { TaskColor } from "./TaskHead";
import styles from "./TaskHead.module.scss";

const TaskHeadWrapper = () => {
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStatuses = async () => {
      try {
        const statusesData = await fetchStatuses();
        setStatuses(statusesData);
      } catch {
        setError("Failed to fetch statuses");
      } finally {
        setLoading(false);
      }
    };

    getStatuses();
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
        return TaskColor.Red; // Default color
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
