import React from "react";
import styles from "../PrioritiesDropdown/StatuesDropdown.module.scss";
import { StatusData } from "../../api/Statuses";

interface StatusDropdownItemProps {
  status: StatusData;
  onSelect: () => void;
  isSelected: boolean;
}

const StatusDropdownItem: React.FC<StatusDropdownItemProps> = ({
  status,
  onSelect,
  isSelected,
}) => {
  return (
    <li
      className={`${styles.dropdownItem} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      {status.name}
    </li>
  );
};

export default StatusDropdownItem;
