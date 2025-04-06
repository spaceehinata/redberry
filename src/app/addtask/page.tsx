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

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [departmentId, setDepartmentId] = useState<string>("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskName || !departmentId || !status || !priority) {
      setErrorMessage("All fields are required!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", taskName);
    formData.append("description", taskDescription);
    formData.append("department_id", departmentId);
    formData.append("status", status);
    formData.append("priority", priority);
    formData.append("due_date", dueDate || "");
    if (selectedEmployee) {
      formData.append("assignee_id", selectedEmployee.id.toString());
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${responseText}`);
      }

      setSuccessMessage("Task added successfully!");
      setErrorMessage(null);

      setTimeout(() => {
        setSuccessMessage(null);
        // optional: close form or redirect
      }, 2000);

      // Reset form
      setTaskName("");
      setTaskDescription("");
      setDepartmentId("");
      setStatus("");
      setPriority("");
      setDueDate("");
      setSelectedEmployee(null);

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`Failed to add task: ${error.message}`);
      } else {
        setErrorMessage("An unknown error occurred");
      }
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create New Task</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.leftSide}>
          <div className={styles.sawyisi}>
            <label className={styles.label}>Task Title*</label>
            <NameInput value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Description</label>
            <Textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          </div>
          <div className={styles.pr}>
            <div className={styles.priority}>
              <label className={styles.label}>Priority*</label>
              <PrioritiesDropdown onPriorityChange={(id) => setPriority(String(id))} />
            </div>
            <div className={styles.statues}>
              <label className={styles.label}>Status*</label>
              <StatusDropdown onStatusChange={(id) => setStatus(String(id))} />
            </div>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.sawyisi}>
            <label className={styles.label}>Department*</label>
            <DepartmentDropdown onDepartmentChange={(id) => setDepartmentId(String(id))} />
          </div>

          <div className={styles.RinputGroup}>
            <label className={styles.label}>Employee</label>
            <EmployeeDropdown
              title="Select Employee"
              onChange={(employee) => setSelectedEmployee(employee)}
              defaultEmployee={selectedEmployee}
            />
          </div>

          <div className={styles.RinputGroup}>
            <label className={styles.label}>Due Date</label>
            <DatePicker value={dueDate} onChange={setDueDate} />
          </div>

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {successMessage && <div className={styles.success}>{successMessage}</div>}

          <div className={styles.button}>
            <Button3 
              text="Add Task" 
              disabled={isSubmitting} 
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
