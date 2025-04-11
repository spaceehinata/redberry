import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from "./TaskPage.module.scss";
import { TaskData, StatusData } from "@/types";
import Round from "@/components/Tag/Round/Round";
import Square from "@/components/Tag/Square/Square";
import StatusDropdown from "@/components/StatusDropdown/StatusDropdown";
import Comment from "@/components/Comments/Comments";
import { updateTaskStatus } from "@/api/updateTaskStatus";
import Header from "@/components/Header/Header";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const TaskPage: React.FC = () => {
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<StatusData[]>([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchTaskData = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!res.ok) throw new Error("Failed to fetch task data");

        const taskData = await res.json();
        setTask(taskData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    const fetchStatuses = async () => {
      try {
        const res = await fetch(`${API_URL}/statuses`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!res.ok) throw new Error("Failed to fetch statuses");

        const statusesData = await res.json();
        setStatuses(statusesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    fetchTaskData();
    fetchStatuses();
  }, [id]);

  const handleStatusChange = (statusId: number) => {
    if (!task || !statusId) return;

    const updatedStatus = statuses.find((status) => status.id === statusId);
    if (updatedStatus) {
      updateTaskStatus(
        task,
        updatedStatus.name,
        setTask,
        (updatedTask: TaskData) => {
          console.log("Task updated successfully:", updatedTask);
        }
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!task) return <div>No task found</div>;

  return (
    <div>
      <Header></Header>
      <div className={Styles.container}>
        <div className={Styles.twoColumnLayout}>
          {/* Left Column: Task Details */}
          <div className={Styles.taskDetailsColumn}>
            <div className={Styles.taskHeader}>
              <div className={Styles.taskTags}>
                <Square priority={task.priority.name} size="small" />
                <Round department={task.department.name} />
              </div>
              <h1>{task.name}</h1>
              <p>{task.description}</p>
            </div>
            <div className={Styles.details}>
              <span>დავალების დეტალები</span>
              <div className={Styles.detailItem}>
                <img
                  src="/asserts/icon1.svg"
                  alt="სტატუსი"
                  className={Styles.icon}
                />
                <div>
                  <p className={Styles.label}>სტატუსი</p>
                </div>
                <StatusDropdown
                  title="Task Status"
                  defaultStatus={task.status}
                  onStatusChange={handleStatusChange} // Pass the handler function
                />
              </div>

              <div className={Styles.detailItem}>
                <img
                  src="/asserts/icon2.svg"
                  alt="თანამშრომელი"
                  className={Styles.icon}
                />
                <div>
                  <p className={Styles.label}>თანამშრომელი</p>
                </div>
                <div className={Styles.assignee}>
                  <div className={Styles.department}>
                    <p>{task.department.name}</p>
                  </div>
                  <div className={Styles.employeeInfo}>
                    <img
                      src={task.employee.avatar || "/asserts/avatar.svg"}
                      alt={`${task.employee.name} ${task.employee.surname}`}
                      className={Styles.avatar}
                    />
                    <p>
                      {task.employee.name} {task.employee.surname}
                    </p>
                  </div>
                </div>
              </div>

              <div className={Styles.detailItem}>
                <img
                  src="/asserts/calendar.svg"
                  alt="დავალების ვადა"
                  className={Styles.icon}
                />
                <div>
                  <p className={Styles.label}>დავალების ვადა</p>
                </div>
                <p className={Styles.value}>
                  {new Date(task.due_date).toLocaleDateString("ka-GE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Comment Section */}
          <div className={Styles.commentColumn}>
            <Comment taskId={id as string} />
            {/* <div className={Styles.commentHeader}>
            <p>კომენტარები {task.commentCount}</p>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
