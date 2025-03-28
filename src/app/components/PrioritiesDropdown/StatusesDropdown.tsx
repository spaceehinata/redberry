"use client";
import React, { useState, useEffect } from "react";
import styles from "./StatuesDropdown.module.scss";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

interface Status {
  id: number;
  name: string;
  color: string; 
}

interface StatusesDropdownProps {
  title: string; 
}

const StatusesDropdown: React.FC<StatusesDropdownProps> = ({ title }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(`${API_URL}/statuses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch statuses");
        }

        const data = await response.json();
        setStatuses(data); 
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  const toggleDropdown = () => {
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
            <li key={status.id} className={styles.dropdownItem}>
              <span
                className={styles.statusIndicator}
                style={{ backgroundColor: status.color }}
              ></span>
              <span>{status.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusesDropdown;