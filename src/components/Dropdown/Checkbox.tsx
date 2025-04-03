import React from "react";
import styles from "./Dropdown.module.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  avatar?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, avatar }) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxLabel}>
        {avatar && <img src={avatar} alt={label} className={styles.avatar} />} {label}
      </span>
    </label>
  );
};

export default Checkbox;
