"use client";

import { useState } from "react";
import Filter from "../components/Filter/Filter";
import Dropdown from "../components/Dropdown/Dropdown";
import Header from "../components/Header/Header";
import Task from "../components/Task/Task";
import AddCoworker from "../components/AddCoworker/AddCoworker";
import TaskHeadWrapper from "../components/TaskHead/TaskHeadWrapper"; // Importe TaskHeadWrapper
import styles from "./page.module.css";
import Comments from "@/components/Comments/Comments";
// import StatusDropdown from "@/components/StatusDropdown/StatusDropdown";
export default function Page() {
  const [filters, setFilters] = useState({
    departments: [] as string[],
    priorities: [] as string[],
    employees: [] as string[],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (newFilters: {
    departments: string[];
    priorities: string[];
    employees: string[];
  }) => {
    console.log("Applying new filters:", newFilters);
    setFilters(newFilters);
  };

  const handleRemoveFilter = (
    category: "departments" | "priorities" | "employees",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item: string) => item !== value),
    }));
  };

  const handleOpenModal = () => {
    console.log("Opening AddCoworker modal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing AddCoworker modal");
    setIsModalOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      {/* <StatusDropdown /> */}
      <Header onOpenModal={handleOpenModal} />
      <h1 className={styles.title}>დავალებების გვერდი</h1>
      <Dropdown onFilterChange={handleFilterChange} />
      <Filter filters={filters} onRemoveFilter={handleRemoveFilter} />
      <TaskHeadWrapper />
      <div className={styles.taskWrapper}>
        <Task showAll={true} filters={filters} />
      </div>
      <div>
        {filters.priorities.length > 0 && (
          <div>Priorities: {filters.priorities.join(", ")}</div>
        )}
        {filters.employees.length > 0 && (
          <div>Employees: {filters.employees.join(", ")}</div>
        )}
        {filters.departments.length === 0 &&
          filters.priorities.length === 0 &&
          filters.employees.length === 0 && <div></div>}
      </div>
      {isModalOpen && <AddCoworker onClose={handleCloseModal} />}
    </div>
  );
}
