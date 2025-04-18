import React, { useEffect, useState } from "react";
import Styles from "./Task.module.scss";
import Square from "../Tag/Square/Square";
import Round from "../Tag/Round/Round";
import { clsx } from "clsx";
import { TaskColor } from "@/types";
import Link from "next/link";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

interface TaskData {
  id: number;
  name: string;
  description: string;
  due_date: string;
  priority: { name: string };
  employee: { name: string; surname: string; avatar?: string };
  department: { name: string };
  status: { id: number; name: string };
  total_comments?: number;
}

interface StatusData {
  id: number;
  name: string;
}

interface TaskProps {
  showAll: boolean;
  filters?: {
    departments: string[];
    priorities: string[];
    employees: string[];
  };
}

const Task: React.FC<TaskProps> = ({
  showAll,
  filters = { departments: [], priorities: [], employees: [] },
}) => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks, statuses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, statusesRes] = await Promise.all([
          fetch(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }),
          fetch(`${API_URL}/statuses`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }),
        ]);

        if (!tasksRes.ok || !statusesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [tasksData, statusesData] = await Promise.all([
          tasksRes.json(),
          statusesRes.json(),
        ]);

        setTasks(tasksData);
        setStatuses(statusesData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (statusName: string): TaskColor => {
    switch (statusName) {
      case "დასაწყები":
        return "yellow";
      case "პროცესში":
        return "red";
      case "მზად ტესტირებისთვის":
        return "pink";
      case "დასრულებული":
        return "blue";
      default:
        console.log("Unmatched status:", statusName);
        return "yellow";
    }
  };

  const formatDate = (dateString: string) => {
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

  const filteredTasks =
    showAll &&
    filters.departments.length === 0 &&
    filters.priorities.length === 0 &&
    filters.employees.length === 0
      ? tasks
      : tasks.filter((task) => {
          const departmentMatch =
            filters.departments.length === 0 ||
            filters.departments.includes(task.department.name);
          const priorityMatch =
            filters.priorities.length === 0 ||
            filters.priorities.includes(task.priority.name);
          const employeeMatch =
            filters.employees.length === 0 ||
            filters.employees.includes(
              `${task.employee.name} ${task.employee.surname}`
            );

          return departmentMatch && priorityMatch && employeeMatch;
        });

  const groupedTasks = statuses.map((status) =>
    filteredTasks.filter((task) => task.status.id === status.id)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={Styles.container}>
      <div className={Styles.taskGrid}>
        {statuses.map((status, index) => (
          <div key={status.id} className={Styles.taskColumn}>
            {groupedTasks[index].length > 0 ? (
              groupedTasks[index].map((task) => (
                <Link
                  href={`/taskpage/${task.id}`}
                  key={task.id}
                  className={clsx(
                    Styles.task,
                    Styles[getStatusColor(task.status.name)]
                  )}
                >
                  <div className={Styles.head}>
                    <div className={Styles.buttons}>
                      <Square priority={task.priority.name} size="small" />
                      <Round department={task.department.name} />
                    </div>
                    <div className={Styles.date}>
                      {formatDate(task.due_date)}
                    </div>
                  </div>
                  <div className={Styles.middle}>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                  </div>
                  <div className={Styles.bottom}>
                    <img
                      src={task.employee.avatar || "/asserts/avatar.svg"}
                      alt={`${task.employee.name} ${task.employee.surname}`}
                      className={Styles.avatar}
                    />
                    <div className={Styles.comments}>
                      <img src="/asserts/Comments.svg" alt="comment" />
                      <p>{task.total_comments ?? 0}</p>{" "}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={Styles.emptyColumn}>No tasks</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
