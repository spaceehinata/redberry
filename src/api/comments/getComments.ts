// src/api/comments/getComments.ts

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export const getComments = async (taskId: number) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch comments. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;  // API პასუხის ფლატური დამუშავება
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
};
