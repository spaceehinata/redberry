import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Styles from "./TaskPage.module.scss";
import { TaskData, StatusData, CommentType } from "@/types";
import Round from "@/components/Tag/Round/Round";
import Square from "@/components/Tag/Square/Square";
import StatusDropdown from "@/components/StatusDropdown/StatusDropdown";
import Comment from "@/components/Comments/Comments";
import { updateTaskStatus } from "@/api/updateTaskStatus";
import Image from "next/image"; // <-- added import

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const TaskPage: React.FC = () => {
  const [task, setTask] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

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

    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks/${id}/comments`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!res.ok) throw new Error("Failed to fetch comments");

        const commentsData = await res.json();
        setComments(commentsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTaskData();
    fetchStatuses();
    fetchComments();
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
                <Image
                  src="/asserts/icon1.svg"
                  alt="სტატუსი"
                  width={24}
                  height={24}
                  className={Styles.icon}
                />
                <div>
                  <p className={Styles.label}>სტატუსი</p>
                </div>
                <StatusDropdown
                  title="Task Status"
                  defaultStatus={task.status}
                  onStatusChange={handleStatusChange}
                />
              </div>

              <div className={Styles.detailItem}>
                <Image
                  src="/asserts/icon2.svg"
                  alt="თანამშრომელი"
                  width={24}
                  height={24}
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
                    <Image
                      src={task.employee.avatar || "/asserts/avatar.svg"}
                      alt={`${task.employee.name} ${task.employee.surname}`}
                      width={40}
                      height={40}
                      className={Styles.avatar}
                    />
                    <p>
                      {task.employee.name} {task.employee.surname}
                    </p>
                  </div>
                </div>
              </div>

              <div className={Styles.detailItem}>
                <Image
                  src="/asserts/calendar.svg"
                  alt="დავალების ვადა"
                  width={24}
                  height={24}
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
            <Comment taskId={id as string} initialComments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
