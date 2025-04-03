import React, { useState, useEffect } from "react";
import styles from "../PrioritiesDropdown/StatuesDropdown.module.scss";
import { fetchStatuses, StatusData } from "../../api/Statuses";
import StatusDropdownItem from "./StatusDropdownItem";

const StatusDropdown = ({ title }: { title: string }) => {
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusData | null>(null);

  const toggleDropdown = async () => {
    if (!isOpen && statuses.length === 0) {
      const data = await fetchStatuses();
      setStatuses(data);
    }
    setIsOpen(!isOpen);
  };

  const handleStatusSelect = (status: StatusData) => {
    setSelectedStatus(status);
    setIsOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    // Initially load the statuses
    const loadStatuses = async () => {
      const data = await fetchStatuses();
      setStatuses(data);
    };

    loadStatuses();
  }, []);

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <span>{selectedStatus ? selectedStatus.name : "აირჩიე სტატუსი"}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
        </span>
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {statuses.map((status) => (
            <StatusDropdownItem
              key={status.id}
              status={status}
              onSelect={() => handleStatusSelect(status)}
              isSelected={selectedStatus?.id === status.id} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
