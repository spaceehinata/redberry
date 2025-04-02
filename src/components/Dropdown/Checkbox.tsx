import React from "react";
import styles from "./Dropdown.module.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className={styles.checkbox}>
      {" "}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      {label && <span className={styles.checkboxLabel}>{label}</span>}{" "}
    </label>
  );
};

export default Checkbox;
