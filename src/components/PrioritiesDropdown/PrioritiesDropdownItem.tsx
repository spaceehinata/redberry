import React from "react";
import styles from "./StatuesDropdown.module.scss";
import { Priority } from "../../api/index";
import Image from "next/image"; // Import Image from next/image

interface PrioritiesDropdownItemProps {
  priority: Priority;
  onSelect: () => void;
}

const PrioritiesDropdownItem: React.FC<PrioritiesDropdownItemProps> = ({
  priority,
  onSelect,
}) => {
  return (
    <li className={styles.dropdownItem} onClick={onSelect}>
      <Image
        src={priority.icon}
        alt={`${priority.name} icon`}
        className={styles.priorityIcon}
        width={24} // Adjust width and height as per your design
        height={24}
      />
      <span>{priority.name}</span>
    </li>
  );
};

export default PrioritiesDropdownItem;
