"use client";

import React, { useState } from "react";
import Calendar from "../components/Calendar/Calendar";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <div>
      <h1>Selected Date: {selectedDate?.toLocaleDateString() || "None"}</h1>
      <Calendar onSelectDate={handleSelectDate} onCancel={handleCancel} />
    </div>
  );
};

export default App;