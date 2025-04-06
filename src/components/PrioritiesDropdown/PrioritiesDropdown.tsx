import React, { useState, useEffect } from "react";
import styles from "./StatuesDropdown.module.scss";
import { fetchPriorities, Priority } from "../../api/index";
import PrioritiesDropdownItem from "./PrioritiesDropdownItem";

interface PrioritiesDropdownProps {
  title: string;
}

const PrioritiesDropdown: React.FC<PrioritiesDropdownProps> = ({ title }) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const toggleDropdown = async () => {
    if (!isOpen && priorities.length === 0) {
      setLoading(true);
      try {
        const data = await fetchPriorities();
        setPriorities(data);
      } catch (error) {
        setError("Error fetching priorities");
      } finally {
        setLoading(false);
      }
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

      {loading && <div className={styles.loading}>Loading...</div>}

      {error && <div className={styles.error}>{error}</div>}

      {isOpen && !loading && !error && (
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
