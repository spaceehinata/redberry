"use client";
import React, { useEffect, useState } from "react";
import Styles from "./Task.module.scss";
import Square from "../Tag/Square/Square";
import Round from "../Tag/Round/Round";
import { clsx } from "clsx";

type Priority = {
  id: number;
  name: "High" | "Medium" | "Low";
  icon: string;
};

type Department = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
};

type TaskType = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: { id: number; name: string };
  priority: Priority;
  department: Department;
  employee: Employee;
};

type Border = "pink" | "red" | "blue" | "yellow";
type Color = "pink" | "orange" | "blue" | "yellow";

type TaskProps = {
  taskId?: string;
  showAll?: boolean;
};

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const Task = ({ taskId, showAll = false }: TaskProps) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
        }

        const data: TaskType[] = await response.json();
        console.log("Fetched Data:", data);
        setTasks(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getBorderColor = (priorityName: string): Border => {
    switch (priorityName.toLowerCase()) {
      case "high":
        return "pink";
      case "medium":
        return "yellow";
      case "low":
        return "blue";
      default:
        return "red";
    }
  };

  const getRoundColor = (priorityName: string): Color => {
    switch (priorityName.toLowerCase()) {
      case "high":
        return "pink";
      case "medium":
        return "orange";
      case "low":
        return "blue";
      default:
        return "yellow";
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const monthNames = [
      "იანვ",
      "თებ",
      "მარ",
      "აპრ",
      "მაი",
      "ივნ",
      "ივლ",
      "აგვ",
      "სექ",
      "ოქტ",
      "ნოე",
      "დეკ",
    ];
    return `${day} ${monthNames[date.getMonth()]}, ${year}`;
  };

  const renderTask = (task: TaskType) => {
    const border = getBorderColor(task.priority.name);
    const color = getRoundColor(task.priority.name);

    return (
      <div key={task.id} className={clsx(Styles.task, Styles[border])}>
        <div className={Styles.head}>
          <div className={Styles.buttons}>
            <Square
              priority={
                task.priority.name.toLowerCase() as "high" | "medium" | "low"
              }
              size="small"
            />
            <Round color={color} />
          </div>
          <div className={Styles.date}>{formatDate(task.due_date)}</div>
        </div>
        <div className={Styles.middle}>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </div>
        <div className={Styles.bottom}>
          <img
            src={task.employee.avatar}
            alt={`${task.employee.name} ${task.employee.surname}`}
          />
          <div className={Styles.comments}>
            <img src="/asserts/Comments.svg" alt="comment" />
            <p>8</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (showAll) return <>{tasks.map(renderTask)}</>;

  const taskToShow = taskId
    ? tasks.find((task) => task.id === parseInt(taskId))
    : tasks[0];
  if (!taskToShow) return <div>No task found</div>;

  return renderTask(taskToShow);
};

export default Task;
