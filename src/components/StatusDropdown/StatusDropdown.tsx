import React, { useState } from "react";
import styles from "./StatusDropdown.module.scss";
import { fetchStatuses, StatusData } from "../../api/Statuses"; // ✅ ახლა ვიღებთ აქედან
import StatusDropdownItem from "./StatusDropdownItem";

interface StatusesDropdownProps {
  title: string;
}

const StatusDropdown: React.FC<StatusesDropdownProps> = ({ title }) => {
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = async () => {
    if (!isOpen && statuses.length === 0) {
      const data = await fetchStatuses();
      setStatuses(data);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <span>{title}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
        </span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {statuses.map((status) => (
            <StatusDropdownItem key={status.id} status={status} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
