import React, { useState } from "react";
import styles from "./StatuesDropdown.module.scss";
import { fetchPriorities, Priority } from "../../api/index";
import PrioritiesDropdownItem from "./PrioritiesDropdownItem";

interface PrioritiesDropdownProps {
  onPriorityChange: (priorityId: number) => void;
}

const PrioritiesDropdown: React.FC<PrioritiesDropdownProps> = ({
  onPriorityChange,
}) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>("");
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

  const handleSelect = (priority: Priority) => {
    setSelectedPriority(priority.name);
    onPriorityChange(priority.id);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        <span>{selectedPriority || "აირჩიე პრიორიტეტი"}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
        </span>
      </div>

      {loading && <div className={styles.loading}>იტვირთება...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {isOpen && !loading && !error && (
        <ul className={styles.dropdownList}>
          {priorities.map((priority) => (
            <PrioritiesDropdownItem
              key={priority.id}
              priority={priority}
              onSelect={() => handleSelect(priority)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrioritiesDropdown;
