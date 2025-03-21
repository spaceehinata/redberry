import React from "react";
import styles from "./Square.module.scss";
import clsx from "clsx";

type Priority = "high" | "medium" | "low";
type Size = "big" | "small";

type Props = {
  priority: Priority;
  size: Size;
  icon?: string; // Optional icon prop
  label?: string; // Optional label prop
};

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case "high":
      return { icon: "/asserts/High.svg", label: "მაღალი", color: "red" };
    case "medium":
      return { icon: "/asserts/Medium.svg", label: "საშუალო", color: "yellow" };
    case "low":
      return { icon: "/asserts/Low.svg", label: "დაბალი", color: "green" };
    default:
      return { icon: "/asserts/Medium.svg", label: "Medium", color: "yellow" };
  }
};

const Square = ({ priority, size, icon, label }: Props) => {
  const {
    icon: priorityIcon,
    label: priorityLabel,
    color,
  } = getPriorityIcon(priority);

  return (
    <div className={clsx(styles.button, styles[color], styles[size])}>
      <img src={icon || priorityIcon} alt={label || priorityLabel} />
      <span>{label || priorityLabel}</span>
    </div>
  );
};

export default Square;
