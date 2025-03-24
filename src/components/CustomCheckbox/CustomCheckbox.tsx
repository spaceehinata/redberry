"use client";
import CheckboxIcon from "@/icons/CheckboxIcon";
import { TagColor } from "@/types";
import { useState } from "react";
import styles from "./CustomCheckbox.module.scss";

const returnColor = (color: TagColor) => {
  switch (color) {
    case "pink":
      return "rgba(255, 102, 168, 1)";
    case "blue":
      return "rgba(137, 182, 255, 1)";
    case "orange":
      return "rgba(253, 154, 106, 1)";
    case "yellow":
      return "rgba(255, 216, 109, 1)";
    case "purple":
      return "rgba(131, 56, 236, 1)";
  }
};

const CustomCheckbox = ({
  color = "purple",
  handleChange,
}: {
  color?: TagColor;
  handleChange: () => void;
}) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((prev) => !prev);
    handleChange();
  };

  return (
    <button className={styles.container} onClick={handleToggle}>
      <CheckboxIcon stroke={returnColor(color)} checked={checked} />
    </button>
  );
};

export default CustomCheckbox;
