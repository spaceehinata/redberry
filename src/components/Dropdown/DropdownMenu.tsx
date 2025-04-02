// DropdownMenu.tsx
import React from "react";
import CheckboxWithText from "./CheckboxWithText";
import Button1 from "../Buttons/Button1/Button1"; // საჭირო კომპონენტის იმპორტი
import styles from "./Dropdown.module.scss";
import { OptionData } from "../../api/index"; // სწორად იყენებთ OptionData

interface DropdownMenuProps {
  options: OptionData[];
  checkedItems: boolean[];
  onToggle: (index: number) => void;
  onApplyFilters: () => void; // ახალი ფუნქცია ღილაკის დასაყენებლად
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  checkedItems,
  onToggle,
  onApplyFilters,
}) => {
  if (!options.length) {
    return <p>მონაცემები არ არის</p>;
  }

  return (
    <div className={styles.dropdownMenu}>
      {options.map((item, idx) => (
        <CheckboxWithText
          key={item.id}
          item={item}
          checked={checkedItems[idx] || false}
          onChange={() => onToggle(idx)}
          isEmployee={Boolean(item.surname)} // თუ არის surname, თანამშრომელია
        />
      ))}

      {/* Apply Filters Button */}
      <div className={styles.selectButton}>
        <Button1 text="არჩევა" onClick={onApplyFilters} />
      </div>
    </div>
  );
};

export default DropdownMenu;
