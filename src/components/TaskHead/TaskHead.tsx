// components/TaskHead.tsx
import clsx from "clsx";
import React from "react";
import styles from "./TaskHead.module.scss";

export enum TaskColor {
  Yellow = "yellow",
  Red = "red",
  Pink = "pink",
  Blue = "blue",
}

interface TaskHeadProps {
  color: TaskColor;
  text: string;
}

const TaskHead = ({ color, text }: TaskHeadProps) => {
  return <div className={clsx(styles.header, styles[color])}>{text}</div>;
};

export default TaskHead;
