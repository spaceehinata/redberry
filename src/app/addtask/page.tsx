"use client";
import React, { useState } from "react";
import styles from "./addtask.module.scss";
import NameInput from "@/components/NameSurname/Name";
import Button3 from "@/components/Buttons/Button3/Button3";
import DepartmentDropdown from "@/components/DepartmentDropDown/DepartmentDropdown";
import StatusDropdown from "@/components/StatusDropdown/StatusDropdown";
import PrioritiesDropdown from "@/components/PrioritiesDropdown/PrioritiesDropdown";
import DatePicker from "@/components/calendar/DatePicker";
import EmployeeDropdown from "@/components/employee/EmployeeDropdow";
import Textarea from "@/components/Textarea/TextArea"; 
import { EmployeeData } from "@/api/Employees";
import { StyleRegistry } from "styled-jsx";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskName || !department || !status) {
      alert("გთხოვთ შეავსოთ ყველა სავალდებულო ველი!");
      return;
    }
    if (taskDescription && (taskDescription.length < 2 || taskDescription.length > 255)) {
      alert("აღწერა უნდა იყოს 2-დან 255 სიმბოლომდე!");
      return;
    }
    console.log({
      taskName,
      taskDescription,
      department,
      status,
      priority,
      dueDate,
      assignedEmployee: selectedEmployee,
    });
    setTaskName("");
    setTaskDescription("");
    setDepartment("");
    setStatus("");
    setPriority("");
    setDueDate("");
    setSelectedEmployee(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>შექმენი ახალი დავალება</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.leftSide}>
            <div className={styles.sawyisi}>
              <label htmlFor="taskName" className={styles.label}>
                სათაური*
              </label>
              <NameInput
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="taskDescription" className={styles.label}>
                აღწერა
              </label>
              <Textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div className={styles.pr}>
            <div className={styles.priority}>
                <label htmlFor="priority" className={styles.label}>
                  პრიორიტეტი*
                </label>
                <PrioritiesDropdown
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
              <div className={styles.statues}>
                <label htmlFor="status" className={styles.label}>
                  სტატუსი*
                </label>
                <StatusDropdown
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.sawyisi}>
              <label htmlFor="department" className={styles.label}>
                დეპარტამენტი*
              </label>
              <DepartmentDropdown
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className={styles.RinputGroup}>
              <label className={styles.label}>თანამშრომელი</label>
              <EmployeeDropdown
                title="აირჩიე თანამშრომელი"
                onChange={(employee) => setSelectedEmployee(employee)}
                defaultEmployee={selectedEmployee}
              />
            </div>
            <div className={styles.RinputGroup}>

              <DatePicker
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className={styles.button}> 
                <Button3 text="დავალების დამატება" onClick={() => {}} />
            </div>
          </div>
      </form>
    </div>
  );
};

export default AddTask;