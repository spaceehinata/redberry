import React, { useState } from "react";
import styles from "./DatePicker.module.css";
import Image from "next/image"; 
interface DatePickerCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onCancel: () => void;
  onOk: () => void;
}

export const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  selectedDate,
  onDateSelect,
  onCancel,
  onOk,
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const renderCalendarHeader = () => (
    <header className={styles.actionBar}>
      <div className={styles.month}>
        <span className={styles.monthText}>
          {currentDate.toLocaleString("ka-GE", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <Image
          src="/asserts/Rectangle 4.svg"
          alt="Calendar icon"
          className={styles.monthIcon}
          width={20}
          height={20} 
        />
      </div>
      <div className={styles.arrows}>
        <button onClick={handlePrevMonth} className={styles.arrowButton}>
        <Image
            src="/asserts/Arrow-upp.svg"
            alt="Previous month"
            className={styles.arrowIcon}
            width={20} 
            height={20}
          />
        </button>
        <button onClick={handleNextMonth} className={styles.arrowButton}>
        <Image
            src="/asserts/Arrow-down.svg"
            alt="Next month"
            className={styles.arrowIcon}
            width={20} 
            height={20}
          />
        </button>
      </div>
    </header>
  );

  const renderWeekDays = () => (
    <div className={styles.row}>
      {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
        <div key={index} className={styles.tile}>
          {day}
        </div>
      ))}
    </div>
  );

  const renderDays = () => {
    const days = [];
    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    ).getDate();

    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className={`${styles.tile} ${styles.prevMonth}`}>
          {prevMonthDays - i}
        </div>,
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected =
        selectedDate?.getDate() === i &&
        selectedDate?.getMonth() === currentDate.getMonth() &&
        selectedDate?.getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={i}
          onClick={() =>
            onDateSelect(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
            )
          }
          className={`${styles.tile} ${isSelected ? styles.selectedTile : ""}`}
        >
          {i}
        </button>,
      );
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} className={`${styles.tile} ${styles.nextMonth}`}>
          {i}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className={styles.datePickerNative}>
      {renderCalendarHeader()}
      <div className={styles.calendarList}>
        {renderWeekDays()}
        <div className={styles.daysGrid}>{renderDays()}</div>
      </div>
      <footer className={styles.actionBar2}>
        <button onClick={onCancel} className={styles.actionButton}>
          Cancel
        </button>
        <button onClick={onOk} className={styles.actionButton}>
          OK
        </button>
      </footer>
    </div>
  );
};
