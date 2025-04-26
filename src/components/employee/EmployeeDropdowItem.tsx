import React from "react";
import styles from "./Employee.module.scss";
import { EmployeeData } from "../../api/Employees";
import Image from "next/image"; // 🛠 import Image from next/image

interface EmployeeDropdownItemProps {
  employee: EmployeeData;
  onSelect: () => void;
  isSelected: boolean;
}

const EmployeeDropdownItem: React.FC<EmployeeDropdownItemProps> = ({
  employee,
  onSelect,
  isSelected,
}) => {
  return (
    <li
      className={`${styles.dropdownItem} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <div className={styles.employeeItemContent}>
        <Image
          src={employee.avatar}
          alt={`${employee.name} ${employee.surname}`}
          className={styles.avatar}
          width={48} // Example size, adjust as needed
          height={48} // Example size, adjust as needed
        />
        <span className={styles.employeeName}>
          {employee.name} {employee.surname}
        </span>
      </div>
    </li>
  );
};

export default EmployeeDropdownItem;
