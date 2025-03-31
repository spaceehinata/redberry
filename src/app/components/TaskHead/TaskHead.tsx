import clsx from "clsx";
import React from "react";
import { TaskColor } from "@/types";
import styles from "./TaskHead.module.scss";

type Props = {
  color: TaskColor;
};

const getcolor = (color: TaskColor) => {
  switch (color) {
    case "yellow":
      return { text: "დასაწყები" };
    case "red":
      return { text: "პროცესში" };
    case "pink":
      return { text: "მზად ტესტირებისთვის" };
    case "blue":
      return { text: "დასრულებული" };
    default:
      return { text: "დასაწყები" };
  }
};

const TaskHead = ({ color }: Props) => {
  const { text } = getcolor(color);
  return <div className={clsx(styles.header, styles[color])}>{text}</div>;
};


const TaskHeadWrapper = () => {
  return (
    <div className={styles["header-wrapper"]}>
      <TaskHead color="yellow" />
      <TaskHead color="red" />
      <TaskHead color="pink" />
      <TaskHead color="blue" />
    </div>
  );
};

export default TaskHeadWrapper;
