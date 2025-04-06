const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export interface EmployeeData {
  id: number;
  name: string;
  surname: string; // Add surname
  avatar: string; // Add avatar URL
}

export interface NewEmployeeData {
  name: string;
  surname: string; // Add surname for creating an employee
  avatar?: string; // Optional avatar for creating an employee
}

// GET /employees
export const fetchEmployees = async (): Promise<EmployeeData[]> => {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// POST /employees
export const createEmployee = async (
  employee: NewEmployeeData
): Promise<EmployeeData> => {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error("Failed to create employee");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};