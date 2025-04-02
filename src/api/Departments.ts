const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export interface Department {
  id: number;
  name: string;
}

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await fetch(`${API_URL}/departments`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};
