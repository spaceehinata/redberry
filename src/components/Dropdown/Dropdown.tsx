import React, { useState, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import { fetchData } from "../../api/index";
import styles from "./Dropdown.module.scss";
import clsx from "clsx";

interface OptionData {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
}

const Dropdown: React.FC = () => {
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
    console.log("Filters Applied");
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const endpoints = ["/departments", "/priorities", "/employees"];
        const responses = await Promise.all(
          endpoints.map((endpoint) => fetchData(endpoint))
        );

        console.log("Fetched data:", responses);
        // დაამატეთ კონსოლ ლოგი, რომ იხილოთ რა მონაცემები მოდის

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
            <img src="/asserts/Shape.svg" alt="Dropdown arrow" />
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
