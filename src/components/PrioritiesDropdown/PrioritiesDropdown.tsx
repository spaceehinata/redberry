import React, { useState } from "react";
import styles from "./PrioritiesDropdown.module.scss";
import { fetchPriorities, Priority } from "../../api/index";
import PrioritiesDropdownItem from "./PrioritiesDropdownItem";

interface PrioritiesDropdownProps {
  title: string;
}

const PrioritiesDropdown: React.FC<PrioritiesDropdownProps> = ({ title }) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = async () => {
    if (!isOpen && priorities.length === 0) {
      const data = await fetchPriorities();
      setPriorities(data);
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
          {priorities.map((priority) => (
            <PrioritiesDropdownItem key={priority.id} priority={priority} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrioritiesDropdown;
