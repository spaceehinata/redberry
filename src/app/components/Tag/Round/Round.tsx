import clsx from "clsx";
import React from "react";
import { TagColor } from "@/types";
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

type Props = {
  color: TagColor;
  department: string;
};

const Round = ({ color, department }: Props) => {
  const customName = customDepartmentNames[department] || department;
  return <div className={clsx(styles.button, styles[color])}>{customName}</div>;
};

export default Round;
