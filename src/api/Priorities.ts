// api/statuses.ts
const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export interface StatusData {
  id: number;
  name: string;
}

export const fetchStatuses = async (): Promise<StatusData[]> => {
  try {
    const response = await fetch(`${API_URL}/statuses`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch statuses");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return [];
  }
};
