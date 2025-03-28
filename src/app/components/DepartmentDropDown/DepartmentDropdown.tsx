// DepartmentDropdown.tsx
import React, { useState, useEffect } from "react";
import styles from "./DepartmentDropdown.module.scss";

interface Department {
  id: number;
  name: string;
}

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const DepartmentDropdown: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_URL}/departments`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (department: Department) => {
    setSelectedDepartment(department.name);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <label htmlFor="department">განყოფილება*</label>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <div className={styles.dropdownSelected}>
          {selectedDepartment || "განყოფილება მიუთითეთ აქ"}
        </div>
        <img
          src="/asserts/Shape.svg"
          alt="Dropdown arrow"
          className={`${styles.dropdownArrow} ${isOpen ? styles.open : ""}`}
        />
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {departments.map((department) => (
            <li
              key={department.id}
              className={styles.dropdownItem}
              onClick={() => handleSelect(department)}
            >
              {department.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentDropdown;