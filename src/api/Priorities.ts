const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export interface Priority {
  id: number;
  name: string;
  icon: string;
}

export const fetchPriorities = async (): Promise<Priority[]> => {
  try {
    const response = await fetch(`${API_URL}/priorities`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch priorities");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching priorities:", error);
    return [];
  }
};
