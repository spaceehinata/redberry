import React, { useEffect, useState } from "react";
import Styles from "./Task.module.scss";
import Square from "../Tag/Square/Square";
import Round from "../Tag/Round/Round";
import TaskHeadWrapper from "../TaskHead/TaskHead";
import { clsx } from "clsx";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, prioritiesRes, statusesRes] = await Promise.all([
          fetch(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }),
          fetch(`${API_URL}/priorities`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }),
          fetch(`${API_URL}/statuses`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }),
        ]);

        if (!tasksRes.ok || !prioritiesRes.ok || !statusesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [tasksData, prioritiesData, statusesData] = await Promise.all([
          tasksRes.json(),
          prioritiesRes.json(),
          statusesRes.json(),
        ]);

        setTasks(tasksData);
        setPriorities(prioritiesData);
        setStatuses(statusesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBorderColor = (priorityName) => {
    switch (priorityName.toLowerCase()) {
      case "high":
      case "მაღალი":
        return "pink";
      case "medium":
      case "საშუალო":
        return "yellow";
      case "low":
      case "დაბალი":
        return "blue";
      default:
        return "red";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    }, ${date.getFullYear()}`;
  };

  const groupedTasks = [[], [], [], []];
  tasks.forEach((task, index) => {
    groupedTasks[index % 4].push(task);
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={Styles.container}>
      <TaskHeadWrapper />
      <div className={Styles.taskGrid}>
        {groupedTasks.map((group, index) => (
          <div key={index} className={Styles.taskColumn}>
            {group.map((task) => (
              <div
                key={task.id}
                className={clsx(
                  Styles.task,
                  Styles[getBorderColor(task.priority.name)]
                )}
              >
                <div className={Styles.head}>
                  <div className={Styles.buttons}>
                    <Square priority={task.priority.name} size="small" />
                    <Round color={getBorderColor(task.priority.name)} />
                  </div>
                  <div className={Styles.date}>{formatDate(task.due_date)}</div>
                </div>
                <div className={Styles.middle}>
                  <h2>{task.name}</h2>
                  <p>{task.description}</p>
                </div>
                <div className={Styles.bottom}>
                  <img
                    src="/asserts/avatr.svg"
                    alt={`${task.employee.name} ${task.employee.surname}`}
                  />
                  <div className={Styles.comments}>
                    <img src="/asserts/Comments.svg" alt="comment" />
                    <p>8</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
