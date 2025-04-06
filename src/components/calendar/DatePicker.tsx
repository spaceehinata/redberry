"use client";

import React, { useState } from "react";
import styles from "./DatePicker.module.css";
import { DatePickerInput } from "./DatePickerInput";
import { DatePickerCalendar } from "./DatePickerCalendar";

export interface DatePickerProps {
  onChange?: (date: Date | null) => void;
  value?: Date | null;
}

export const DatePicker: React.FC<DatePickerProps> = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date); // Trigger onChange when date is selected
    setIsOpen(false); // Close the calendar after selection
  };

  const handleCancel = () => {
    setIsOpen(false); // Close calendar without selecting a date
  };

  const handleOk = () => {
    onChange?.(selectedDate); // Confirm the selected date
    setIsOpen(false); // Close the calendar
  };

  const handleInputChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
    onChange?.(newDate); // Trigger onChange when user manually edits the input field
  };

  return (
    <section className={styles.datePicker}>
      <label className={styles.label}>დედლაინი</label>
      <div className={styles.container}>
        <DatePickerInput
          value={selectedDate}
          onChange={handleInputChange} // Pass onChange to DatePickerInput
          onClick={() => setIsOpen(!isOpen)} // Toggle calendar open/close
        />
        {isOpen && (
          <DatePickerCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onCancel={handleCancel}
            onOk={handleOk}
          />
        )}
      </div>
    </section>
  );
};

export default DatePicker;
