import React from "react";
import styles from "../PrioritiesDropdown/StatuesDropdown.module.scss";
import { StatusData } from "../../api/Statuses";

interface StatusDropdownItemProps {
  status: StatusData;
}

const StatusDropdownItem: React.FC<StatusDropdownItemProps> = ({ status }) => {
  return (
    <li className={styles.dropdownItem}>
      <span className={styles.statusIndicator}></span>
      <span>{status.name}</span>
    </li>
  );
};

export default StatusDropdownItem;
