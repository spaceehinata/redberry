"use client";

import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.scss";

interface CalendarProps {
  onSelectDate: (date: Date) => void; // Callback to pass the selected date to the parent
  onCancel: () => void; // Callback to handle cancel action
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate, onCancel }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current month/year
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Selected date
  const [inputValue, setInputValue] = useState(""); // Date input field value

  // Georgian month names
  const months = [
    "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
    "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი",
  ];

  // Georgian weekday labels (L, M, M, J, V, S, D)
  const weekdays = ["L", "M", "M", "J", "V", "S", "D"];

  // Get the number of days in the current month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Adjust for Georgian calendar (Monday as first day)
    return (firstDay === 0 ? 6 : firstDay - 1);
  };

  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Handle date selection
  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    // Update the input field with the selected date in DD/MM/YYYY format
    setInputValue(
      `${String(day).padStart(2, "0")}/${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}/${currentDate.getFullYear()}`
    );
  };

  // Handle input change (manual date entry)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Parse the input value (DD/MM/YYYY) and update the selected date
    const [day, month, year] = value.split("/").map(Number);
    if (day && month && year) {
      const newDate = new Date(year, month - 1, day);
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
        setCurrentDate(new Date(year, month - 1, 1));
      }
    }
  };

  // Handle OK button click
  const handleOkClick = () => {
    if (selectedDate) {
      onSelectDate(selectedDate);
    }
  };

  // Generate the days for the calendar grid
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysArray: (number | null)[] = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return (
    <div className={styles.calendarContainer}>
      {/* Date Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="DD/MM/YYYY"
        className={styles.dateInput}
      />

      {/* Calendar Header */}
        <div className={styles.calendarHeader}>
            <button onClick={prevMonth} className={styles.navButton}>
            </button>
            <span className={styles.monthYear}>{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</span>
            <button onClick={nextMonth} className={styles.navButton}>
                <img src="/asserts/Arrow-up.svg" alt="Previous month" />
                <img className={styles.rotateArrow} src="/asserts/Arrow-up.svg" alt="Next month" />
            </button>
        </div>  


      {/* Weekday Labels */}
      <div className={styles.weekdays}>
        {weekdays.map((day, index) => (
          <span key={index} className={styles.weekday}>
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={styles.calendarGrid}>
        {daysArray.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${
              day &&
              selectedDate &&
              day === selectedDate.getDate() &&
              currentDate.getMonth() === selectedDate.getMonth() &&
              currentDate.getFullYear() === selectedDate.getFullYear()
                ? styles.selected
                : ""
            }`}
            onClick={() => day && handleDateClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button onClick={handleOkClick} className={styles.okButton}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Calendar;