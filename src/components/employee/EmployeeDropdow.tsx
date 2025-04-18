import React, { useState } from "react";
import styles from "./Employee.module.scss";
import { fetchEmployees, EmployeeData } from "../../api/Employees";
import EmployeeDropdownItem from "./EmployeeDropdowItem";

interface EmployeeDropdownProps {
  title: string;
  onChange?: (employee: EmployeeData | null) => void;
  defaultEmployee?: EmployeeData | null;
}

const EmployeeDropdown: React.FC<EmployeeDropdownProps> = ({
  title,
  onChange,
  defaultEmployee,
}) => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(
    defaultEmployee || null
  );

  const toggleDropdown = async () => {
    if (!isOpen && employees.length === 0) {
      const data = await fetchEmployees();
      setEmployees(data);
    }
    setIsOpen(!isOpen);
  };

  const handleEmployeeSelect = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    setIsOpen(false);
    if (onChange) {
      onChange(employee);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {selectedEmployee ? (
          // <div className={styles.employeeItemContent}>
          //   <img
          //     src={selectedEmployee.avatar}
          //     alt={`${selectedEmployee.name} ${selectedEmployee.surname}`}
          //     className={styles.avatar}
          //   />
          //   <span className={styles.employeeName}>
          //     {selectedEmployee.name} {selectedEmployee.surname}
          //   </span>
          // </div>
          <div className={styles.employeeContainer}>
            <img
              src={selectedEmployee.avatar}
              alt={`${selectedEmployee.name} ${selectedEmployee.surname}`}
              className={styles.avatar}
            />
            <span className={styles.employeeName}>
              {selectedEmployee.name} {selectedEmployee.surname}
            </span>
          </div>
        ) : (
          <span className={styles.placeholder}>{title}</span>
        )}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
        </span>
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {employees.map((employee) => (
            <EmployeeDropdownItem
              key={employee.id}
              employee={employee}
              onSelect={() => handleEmployeeSelect(employee)}
              isSelected={selectedEmployee?.id === employee.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeDropdown;
