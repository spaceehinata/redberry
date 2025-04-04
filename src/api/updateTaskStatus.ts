import { TaskData, StatusData } from "@/types";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export const updateTaskStatus = async (
  task: TaskData,
  newStatus: string,
  setTask: (task: TaskData) => void,
  updateTask: (task: TaskData) => void
) => {
  if (!task) return;

  try {
    const statusResponse = await fetch(`${API_URL}/statuses`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!statusResponse.ok) throw new Error("Failed to fetch statuses");
    const statuses: StatusData[] = await statusResponse.json();

    const newStatusObj = statuses.find((status) => status.name === newStatus);

    if (!newStatusObj) return;

    const updatedTask: TaskData = { ...task, status: newStatusObj };
    setTask(updatedTask);

    const response = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ status_id: newStatusObj.id }),
    });

    if (!response.ok) throw new Error("Failed to update task status");

    updateTask(updatedTask);
  } catch (error) {
    console.error("Error updating task status:", error);
  }
};
