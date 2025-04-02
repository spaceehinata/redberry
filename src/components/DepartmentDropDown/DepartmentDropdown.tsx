import React, { useState } from "react";
import styles from "./DepartmetDropDown.module.scss";
import { fetchDepartments, Department } from "../../api/index";

interface DepartmentDropdownProps {
  onDepartmentChange: (departmentId: number) => void;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({
  onDepartmentChange,
}) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = async () => {
    setIsOpen(!isOpen);

    if (!isOpen && departments.length === 0) {
      const data = await fetchDepartments();
      setDepartments(data);
    }
  };

  const handleSelect = (department: Department) => {
    setSelectedDepartment(department.name);
    onDepartmentChange(department.id);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <div className={styles.dropdownSelected}>
          {selectedDepartment || "დეპარტამენტი მიუთითეთ აქ"}
        </div>
        <img
          src="/asserts/Shape.svg"
          alt="Dropdown arrow"
          className={`${styles.dropdownArrow} ${isOpen ? styles.open : ""}`}
        />
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {departments.length > 0 ? (
            departments.map((department) => (
              <li
                key={department.id}
                className={styles.dropdownItem}
                onClick={() => handleSelect(department)}
              >
                {department.name}
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

export default DepartmentDropdown;
