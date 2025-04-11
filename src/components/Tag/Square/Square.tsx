"use client";

import styles from "./Square.module.scss";
import clsx from "clsx";
type Size = "big" | "small";

type Props = {
  priority: string;
  size: Size;
  icon?: string;
  label?: string;
};

const Square = ({ priority, size, icon, label }: Props) => {
  const getPriorityDetails = (priorityName: string) => {
    switch (priorityName) {
      case "მაღალი":
        return { icon: "/asserts/High.svg", label: "მაღალი", color: "red" };
      case "საშუალო":
        return {
          icon: "/asserts/Medium.svg",
          label: "საშუალო",
          color: "yellow",
        };
      case "დაბალი":
        return { icon: "/asserts/Low.svg", label: "დაბალი", color: "green" };
      default:
        return {
          icon: "/asserts/Medium.svg",
          label: priorityName,
          color: "yellow",
        };
    }
  };

  const {
    icon: priorityIcon,
    label: priorityLabel,
    color,
  } = getPriorityDetails(priority);

  return (
    <div className={clsx(styles.button, styles[color], styles[size])}>
      <img src={icon || priorityIcon} alt={label || priorityLabel} />
      <span>{label || priorityLabel}</span>
    </div>
  );
};

export default Square;
