import React, { useState } from "react";
import styles from "../PrioritiesDropdown/StatuesDropdown.module.scss";
import { fetchStatuses, StatusData } from "../../api/Statuses";

interface StatusDropdownProps {
  onStatusChange: (statusId: number) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ onStatusChange }) => {
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = async () => {
    setIsOpen(!isOpen);

    if (!isOpen && statuses.length === 0) {
      const data = await fetchStatuses();
      setStatuses(data);
    }
  };

  const handleSelect = (status: StatusData) => {
    setSelectedStatus(status.name);
    onStatusChange(status.id);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <span>{selectedStatus || "აირჩიე სტატუსი"}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
        </span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {statuses.length > 0 ? (
            statuses.map((status) => (
              <li
                key={status.id}
                className={styles.dropdownItem}
                onClick={() => handleSelect(status)}
              >
                {status.name}
              </li>
            ))
          ) : (
            <li className={styles.dropdownItem}>იტვირთება...</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
