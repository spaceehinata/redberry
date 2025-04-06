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
      setErrorMessage("ყველა სავალდებულო ველი უნდა შეავსოთ!");
      return;
    }

    if (taskDescription && (taskDescription.length < 2 || taskDescription.length > 255)) {
      setErrorMessage("აღწერა უნდა იყოს 2-დან 255 სიმბოლომდე!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload = {
      title: taskName,
      description: taskDescription,
      department_id: Number(departmentId),
      status,
      priority,
      due_date: dueDate || null,
      assignee_id: selectedEmployee?.id || null,
    };

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`დავალება ვერ დაემატა: ${errorText}`);
      }

      setSuccessMessage("დავალება წარმატებით დაემატა!");
      setTimeout(() => {
        setSuccessMessage(null);
        // optional: redirect ან ფორმის დახურვა
      }, 2000);

      // Reset form
      setTaskName("");
      setTaskDescription("");
      setDepartmentId("");
      setStatus("");
      setPriority("");
      setDueDate("");
      setSelectedEmployee(null);

    } catch (error: any) {
      setErrorMessage(error.message || "უცნობი შეცდომა");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>შექმენი ახალი დავალება</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.leftSide}>
          <div className={styles.sawyisi}>
            <label className={styles.label}>სათაური*</label>
            <NameInput value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>აღწერა</label>
            <Textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          </div>
          <div className={styles.pr}>
            <div className={styles.priority}>
              <label className={styles.label}>პრიორიტეტი*</label>
              <PrioritiesDropdown onPriorityChange={(id) => setPriority(String(id))} />
              </div>
            <div className={styles.statues}>
              <label className={styles.label}>სტატუსი*</label>
              <StatusDropdown onStatusChange={(id) => setStatus(String(id))} />
              </div>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.sawyisi}>
            <label className={styles.label}>დეპარტამენტი*</label>
            <DepartmentDropdown onDepartmentChange={(id) => setDepartmentId(String(id))} />
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
            <label className={styles.label}>დასრულების თარიღი</label>
            <DatePicker value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {successMessage && <div className={styles.success}>{successMessage}</div>}

          <div className={styles.button}>
            <Button3 text="დავალების დამატება" disabled={isSubmitting} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
