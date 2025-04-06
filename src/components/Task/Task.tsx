import React, { useEffect, useState } from "react";
import Styles from "./Task.module.scss";
import Square from "../Tag/Square/Square";
import Round from "../Tag/Round/Round";
import TaskHeadWrapper from "../TaskHead/TaskHead";
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
  commentCount?: number; // Optional comment count field
}

interface DepartmentData {
  id: number;
  name: string;
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
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentCounts, setCommentCounts] = useState<{
    [taskId: number]: number;
  }>({}); // Store comment counts by task ID

  // Fetch tasks, statuses, priorities, and departments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, prioritiesRes, statusesRes, departmentsRes] =
          await Promise.all([
            fetch(`${API_URL}/tasks`, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }),
            fetch(`${API_URL}/priorities`, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }),
            fetch(`${API_URL}/statuses`, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }),
            fetch(`${API_URL}/departments`, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }),
          ]);

        if (
          !tasksRes.ok ||
          !prioritiesRes.ok ||
          !statusesRes.ok ||
          !departmentsRes.ok
        ) {
          throw new Error("Failed to fetch data");
        }

        const [tasksData, prioritiesData, statusesData, departmentsData] =
          await Promise.all([
            tasksRes.json(),
            prioritiesRes.json(),
            statusesRes.json(),
            departmentsRes.json(),
          ]);

        setTasks(tasksData);
        setPriorities(prioritiesData);
        setStatuses(statusesData);
        setDepartments(departmentsData);

        // Fetch comment count for each task
        const commentCounts = await fetchCommentCounts(tasksData);
        setCommentCounts(commentCounts);
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

  // Fetch comment count for each task
  const fetchCommentCounts = async (tasks: TaskData[]) => {
    const counts: { [taskId: number]: number } = {};
    for (const task of tasks) {
      try {
        const res = await fetch(`${API_URL}/tasks/${task.id}/comments`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        if (res.ok) {
          const comments = await res.json();
          counts[task.id] = comments.length;
        } else {
          counts[task.id] = 0; // No comments if request fails
        }
      } catch (err) {
        counts[task.id] = 0; // Default to 0 if an error occurs
      }
    }
    return counts;
  };

  const getPriorityColor = (priorityName: string) => {
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

  const getDepartmentColor = (departmentName: string) => {
    switch (departmentName) {
      case "ადმინისტრაციის დეპარტამენტი":
        return "purple";
      case "ადამიანური რესურსების დეპარტამენტი":
        return "green";
      case "ფინანსების დეპარტამენტი":
        return "blue";
      case "გაყიდვები და მარკეტინგის დეპარტამენტი":
        return "orange";
      case "ლოჯოსტიკის დეპარტამენტი":
        return "teal";
      case "ტექნოლოგიების დეპარტამენტი":
        return "yellow";
      case "მედიის დეპარტამენტი":
        return "pink";
      case "დიზაინერების დეპარტამენტი":
        return "red";
      default:
        return "gray";
    }
  };

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
      <TaskHeadWrapper />
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
                      <p>{commentCounts[task.id] || 0}</p>{" "}
                      {/* Display the comment count */}
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
