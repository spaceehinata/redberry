import React from "react";
import styles from "./StatuesDropdown.module.scss";
import { Priority } from "../../api/index";

interface PrioritiesDropdownItemProps {
  priority: Priority;
}

const PrioritiesDropdownItem: React.FC<PrioritiesDropdownItemProps> = ({
  priority,
}) => {
  return (
    <li className={styles.dropdownItem}>
      <img
        src={priority.icon}
        alt={`${priority.name} icon`}
        className={styles.priorityIcon}
      />
      <span>{priority.name}</span>
    </li>
  );
};

export default PrioritiesDropdownItem;
