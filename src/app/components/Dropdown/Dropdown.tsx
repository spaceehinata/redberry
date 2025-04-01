"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";
import Button1 from "../Buttons/Button1/Button1";

interface OptionData {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
}

interface FilterState {
  departments: string[];
  priorities: string[];
  employees: string[];
}

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const Dropdown: React.FC<{
  onFilterChange: (filters: FilterState) => void;
}> = ({ onFilterChange }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);
  const [options] = useState<string[]>([
    "დეპარტამენტი",
    "პრიორიტეტი",
    "თანამშრომელი",
  ]);
  const [content, setContent] = useState<OptionData[][]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = ["/departments", "/priorities", "/employees"];
        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`${API_URL}${endpoint}`, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }).then((res) => res.json())
          )
        );

        console.log("Fetched data:", responses);
        setContent(responses);
        setCheckedItems(responses.map((group) => group.map(() => false)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect only runs once on mount

  const handleClick = (index: number) => {
    setSelectedIndex(index === selectedIndex ? null : index);
    setVisibleIndex(index === visibleIndex ? null : index);
    // Clear previously selected checkboxes when the menu is opened
    if (index !== visibleIndex) {
      setCheckedItems(content.map((group) => group.map(() => false)));
    }
  };

  const toggleCheckbox = (categoryIndex: number, itemIndex: number) => {
    setCheckedItems((prev) =>
      prev.map((group, i) =>
        i === categoryIndex
          ? group.map((checked, j) => (j === itemIndex ? !checked : checked))
          : group
      )
    );
  };

  const handleApplyFilters = () => {
    if (!content.length || !checkedItems.length) {
      console.log("No content or checked items available yet");
      return;
    }

    const newFilters: FilterState = {
      departments:
        visibleIndex === 0
          ? content[0]
              ?.filter((_, idx) => checkedItems[0]?.[idx])
              .map((item) => item.name) || []
          : [],
      priorities:
        visibleIndex === 1
          ? content[1]
              ?.filter((_, idx) => checkedItems[1]?.[idx])
              .map((item) => item.name) || []
          : [],
      employees:
        visibleIndex === 2
          ? content[2]
              ?.filter((_, idx) => checkedItems[2]?.[idx])
              .map((item) => `${item.name} ${item.surname}`) || []
          : [],
    };

    console.log("Applying filters:", newFilters);
    onFilterChange(newFilters);
    setVisibleIndex(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisibleIndex(null);
        // Reset the checkboxes when the menu is closed
        setCheckedItems(content.map((group) => group.map(() => false)));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Dependency on empty array ensures the effect is only run once

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.selects}>
        {options.map((text, index) => (
          <div
            key={index}
            className={clsx(styles.select, {
              [styles.selected]: selectedIndex === index,
            })}
            onClick={() => handleClick(index)}
          >
            <p>{text}</p>
            <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
          </div>
        ))}
      </div>

      {visibleIndex !== null && (
        <div className={styles.dropdownMenu}>
          {content[visibleIndex]?.map((item, idx) => (
            <label key={idx} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={checkedItems[visibleIndex]?.[idx] || false}
                onChange={() => toggleCheckbox(visibleIndex, idx)}
              />
              {visibleIndex === 2 ? (
                <div className={styles.employeeInfo}>
                  <img
                    src={item.avatar}
                    alt={`${item.name} ${item.surname}`}
                    className={styles.avatar}
                  />
                  <span>{`${item.name} ${item.surname}`}</span>
                </div>
              ) : (
                item.name
              )}
            </label>
          ))}
          <div className={styles.selectButton}>
            <Button1 text="არჩევა" onClick={handleApplyFilters} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
