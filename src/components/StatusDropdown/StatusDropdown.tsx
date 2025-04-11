import React, { useState } from "react";
import Styles from "../PrioritiesDropdown/StatuesDropdown.module.scss";
import { StatusData } from "@/types";

interface StatusDropdownProps {
  onStatusChange: (statusId: number) => void;
  defaultStatus?: StatusData; // Now optional
  title: string;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  onStatusChange,
  defaultStatus,
  title,
}) => {
  const [statuses, setStatuses] = useState<StatusData[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>(
    defaultStatus?.name || ""
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = async () => {
    setIsOpen(!isOpen);

    if (!isOpen && statuses.length === 0) {
      const data = await fetchStatuses();
      setStatuses(data);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await fetch(
        "https://momentum.redberryinternship.ge/api/statuses",
        {
          headers: {
            Authorization: `Bearer 9e85a2d7-4757-4769-9e4e-f7d01e4f8d08`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error("Failed to fetch statuses");
    } catch (err) {
      console.error("Error fetching statuses:", err);
      return [];
    }
  };

  const handleSelect = (status: StatusData) => {
    setSelectedStatus(status.name);
    onStatusChange(status.id); // Pass the status ID to the parent
    setIsOpen(false);
  };

  return (
    <div className={Styles.dropdownContainer}>
      <div className={Styles.dropdownHeader} onClick={toggleDropdown}>
        <span>{selectedStatus || title}</span>
        <span className={`${Styles.arrow} ${isOpen ? Styles.open : ""}`}>
          <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
        </span>
      </div>
      {isOpen && (
        <ul className={Styles.dropdownList}>
          {statuses.length > 0 ? (
            statuses.map((status) => (
              <li
                key={status.id}
                className={Styles.dropdownItem}
                onClick={() => handleSelect(status)}
              >
                {status.name}
              </li>
            ))
          ) : (
            <li className={Styles.dropdownItem}>იტვირთება...</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
