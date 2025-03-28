import clsx from "clsx";
import React from "react";
import { TagColor } from "@/types";
import styles from "./Round.module.scss";

type Props = {
  color: TagColor;
};

const getColor = (color: TagColor) => {
  switch (color) {
    case "pink":
      return { text: "დიზაინი" };
    case "orange":
      return { text: "მარკეტინგი" };
    case "blue":
      return { text: "ლოჯისტიკა" };
    case "yellow":
      return { text: "ინფ. ტექ." };
    default:
      return { text: "დიზაინი" };
  }
};

const Round = ({ color }: Props) => {
  const { text } = getColor(color);
  return <div className={clsx(styles.button, styles[color])}>{text}</div>;
};

export default Round;
