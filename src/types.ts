export type Priority = "low" | "medium" | "high";
export type TagColor =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";
export type TaskColor = "pink" | "red" | "blue" | "yellow";

export type DepartmentType = { id: number; name: string };
export type PriorityType = {
  id: number;
  name: string;
  icon: string;
};
export type EmployeeType = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: number;
};

// Add StatusData type here
export type StatusData = {
  id: number;
  name: string;
};
