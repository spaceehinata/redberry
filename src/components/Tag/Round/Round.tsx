import clsx from "clsx";
import React from "react";
import styles from "./Round.module.scss";

const customDepartmentNames: { [key: string]: string } = {
  "ადმინისტრაციის დეპარტამენტი": "Administration",
  "ადამიანური რესურსების დეპარტამენტი": "Human Resources",
  "ფინანსების დეპარტამენტი": "Finance",
  "გაყიდვები და მარკეტინგის დეპარტამენტი": "Sales & Marketing",
  "ლოჯოსტიკის დეპარტამენტი": "Logistics",
  "ტექნოლოგიების დეპარტამენტი": "Technology",
  "მედიის დეპარტამენტი": "Media",
  "დიზაინერების დეპარტამენტი": "Design",
};

type TagColor = "red" | "green" | "blue" | "yellow" | "purple" | "orange" | "gray";

type Props = {
  department: string;
};

const customDepartmentColors: { [key: string]: TagColor } = {
  "ადმინისტრაციის დეპარტამენტი": "red",
  "ადამიანური რესურსების დეპარტამენტი": "green",
  "ფინანსების დეპარტამენტი": "blue",
  "გაყიდვები და მარკეტინგის დეპარტამენტი": "yellow",
  "ლოჯოსტიკის დეპარტამენტი": "purple",
  "ტექნოლოგიების დეპარტამენტი": "orange",
  "მედიის დეპარტამენტი": "gray",
  "დიზაინერების დეპარტამენტი": "green",
};

const Round: React.FC<Props> = ({ department }) => {
  const customName = customDepartmentNames[department] || department;
  const color = customDepartmentColors[department] || "blue"; // Default to blue if not found

  return (
    <div className={clsx(styles.button, styles[color])}>
      {customName}
    </div>
  );
};

export default Round;
