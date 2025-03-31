"use client";

import { useState } from "react";
import Filter from "./components/Filter/Filter";
import Dropdown from "./components/Dropdown/Dropdown";
import Header from "./components/Header/Header";
import Task from "./components/Task/Task";
import styles from "./page.module.css";

export default function Page() {
  const [filters, setFilters] = useState({
    departments: [] as string[],
    priorities: [] as string[],
    employees: [] as string[],
  });

  const handleFilterChange = (newFilters: {
    departments: string[];
    priorities: string[];
    employees: string[];
  }) => {
    console.log("Applying new filters:", newFilters);
    setFilters(newFilters);
  };

  const handleRemoveFilter = (category: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item: string) => item !== value),
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <h1 className={styles.title}>დავალებების გვერდი</h1>
      <Dropdown onFilterChange={handleFilterChange} />
      <Filter filters={filters} onRemoveFilter={handleRemoveFilter} />
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
          filters.employees.length === 0 && <div>No filters applied</div>}
      </div>
    </div>
  );
}
