export type Priority = "low" | "medium" | "high";
export type TagColor =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";
  export type TaskColor = "yellow" | "red" | "pink" | "blue";

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
export type TaskData = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  priority: PriorityType;
  employee: EmployeeType;
  department: DepartmentType;
  status: StatusData;
};