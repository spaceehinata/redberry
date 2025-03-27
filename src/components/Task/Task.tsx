import React from "react";
import Styles from "./Task.module.scss";
import Square from "../Tag/Round/Round";
import Round from "../Tag/Square/Square";
import { clsx } from "clsx";


type Border = "pink" | "red" | "blue" | "yellow";
type Priority = "high" | "medium" | "low";
type Color = "pink" | "orange" | "blue" | "yellow";
type Props = {
  priority: Priority;
  color: Color;
  border: Border;
};

const Task = ({ priority, color, border }: Props) => {
  return (
    <div className={clsx(Styles.task, Styles[border])}>
      <div className={Styles.head}>
        <div className={Styles.buttons}>
          <Square priority={priority} size="small"></Square>
          <Round color={color}></Round>
        </div>
        <div className={Styles.date}>22 იანვ, 2022 </div>
      </div>
      <div className={Styles.middle}>
        <h2>Redberry-ს საიტის ლენდინგის დიზაინი </h2>
        <p>
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
          ნავიგაციას.
        </p>
      </div>
      <div className={Styles.bottom}>
        <img src="/asserts/Ellipse 3892.svg" alt="user" />
        <div className={Styles.comments}>
          <img src="/asserts/Comments.svg" alt="comment" />
          <p>8</p>
        </div>
      </div>
    </div>
  );
};

export default Task;