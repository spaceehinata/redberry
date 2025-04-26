import React, { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import { fetchData } from "../../api/index";
import styles from "./Dropdown.module.scss";
import clsx from "clsx";
import Image from "next/image"; // 🛠 import Image from next/image

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

const Dropdown: React.FC<{ onFilterChange: (filters: FilterState) => void }> = ({ onFilterChange }) => {
  const [content, setContent] = useState<OptionData[][]>([]);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[][]>([]);

  const handleClick = (index: number) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  const handleToggle = (visibleIdx: number, itemIdx: number) => {
    setCheckedItems((prev) =>
      prev.map((group, i) =>
        i === visibleIdx
          ? group.map((checked, j) => (j === itemIdx ? !checked : checked))
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
      departments: content[0]?.filter((_, idx) => checkedItems[0]?.[idx]).map((item) => item.name) || [],
      priorities: content[1]?.filter((_, idx) => checkedItems[1]?.[idx]).map((item) => item.name) || [],
      employees: content[2]?.filter((_, idx) => checkedItems[2]?.[idx]).map((item) => `${item.name} ${item.surname}`) || [],
    };

    console.log("Applying filters:", newFilters);
    onFilterChange(newFilters);
    setVisibleIndex(null);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = ["/departments", "/priorities", "/employees"];
        const responses = await Promise.all(
          endpoints.map((endpoint) => fetchData(endpoint))
        );

        console.log("Fetched data:", responses);

        setContent(responses);
        setCheckedItems(responses.map((group) => group.map(() => false)));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.selects}>
        {["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"].map((text, index) => (
          <div
            key={index}
            className={clsx(styles.select, {
              [styles.selected]: visibleIndex === index,
            })}
            onClick={() => handleClick(index)}
          >
            <p>{text}</p>
            <Image
              src="/asserts/Shape.svg"
              alt="Dropdown arrow"
              width={16} // Example size, adjust as needed
              height={16} // Example size, adjust as needed
            />
          </div>
        ))}
      </div>

      {visibleIndex !== null && (
        <DropdownMenu
          options={content[visibleIndex] || []}
          checkedItems={checkedItems[visibleIndex] || []}
          onToggle={(idx) => handleToggle(visibleIndex, idx)}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </div>
  );
};

export default Dropdown;
