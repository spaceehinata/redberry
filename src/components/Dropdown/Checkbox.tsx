import React from "react";
import Image from "next/image"; // 🛠 import Image from next/image
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
        {avatar && (
          <Image
            src={avatar}
            alt={label}
            className={styles.avatar}
            width={24} // Example size, adjust as needed
            height={24} // Example size, adjust as needed
          />
        )}
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
