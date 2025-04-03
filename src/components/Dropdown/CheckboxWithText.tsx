import React from "react";
import Checkbox from "./Checkbox";
import styles from "./Dropdown.module.scss";

interface CheckboxWithTextProps {
  item: { id: number; name: string; surname?: string; avatar?: string };
  checked: boolean;
  onChange: () => void;
  isEmployee: boolean;
}

const CheckboxWithText: React.FC<CheckboxWithTextProps> = ({
  item,
  checked,
  onChange,
  isEmployee,
}) => {
  const label = `${item.name} ${item.surname || ""}`.trim();

  return (
    <div className={styles.checkboxWithText}>
      <Checkbox checked={checked} onChange={onChange} label={label} avatar={isEmployee ? item.avatar : undefined} />
    </div>
  );
};

export default CheckboxWithText;
