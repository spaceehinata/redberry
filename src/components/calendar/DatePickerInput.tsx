import React from "react";
import styles from "./DatePicker.module.css";
import Image from "next/image";

interface DatePickerInputProps {
  value: Date | null;
  onChange: (newDate: Date | null) => void;
  onClick: () => void;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  onChange,
  onClick,
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedDate = inputValue ? new Date(inputValue) : null;
    onChange(parsedDate);
  };

  return (
    <div className={styles.inputContainer}>
      <button onClick={onClick} type="button" className={styles.dateButton}>
      <Image
          src="asserts/calendar-line.svg"
          alt="Calendar"
          className={styles.calendarIcon}
          width={20} 
          height={20} 
        />
      </button>
      <input
        type="text"
        className={styles.dateInput}
        value={formatDate(value)}
        onChange={handleInputChange}
        placeholder="DD/MM/YYYY"
      />
    </div>
  );
};
