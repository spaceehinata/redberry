export const API_URL = "https://momentum.redberryinternship.ge/api";
export const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export interface OptionData {
  id: number; 
  name: string;
  surname?: string;
}

export const fetchData = async (endpoint: string): Promise<OptionData[]> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    const data = await response.json();

    return data.map((item: any) => ({
      ...item,
      id: Number(item.id), 
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
