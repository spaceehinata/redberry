"use client";

import React, { useState, useEffect } from "react";
import styles from "./StatuesDropdown.module.scss"; 

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

interface Priority {
  id: number;
  name: string;
  icon: string;
}

interface PrioritiesDropdownProps {
  title: string;
}

const PrioritiesDropdown: React.FC<PrioritiesDropdownProps> = ({ title }) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const response = await fetch(`${API_URL}/priorities`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch priorities");
        }

        const data = await response.json();
        setPriorities(data);
      } catch (error) {
        console.error("Error fetching priorities:", error);
      }
    };

    fetchPriorities();
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
          {priorities.map((priority) => (
            <li key={priority.id} className={styles.dropdownItem}>
              <img
                src={priority.icon}
                alt={`${priority.name} icon`}
                className={styles.priorityIcon}
              />
              <span>{priority.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrioritiesDropdown;