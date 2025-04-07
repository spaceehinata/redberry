"use client";
import React, { useState } from "react";
import styles from "./addtask.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NameInput from "@/components/NameSurname/NameInput";
import Button3 from "@/components/Buttons/Button3/Button3";
import DepartmentDropdown from "@/components/DepartmentDropDown/DepartmentDropdown";
import StatusDropdown from "@/components/StatusDropdown/StatusDropdown";
import PrioritiesDropdown from "@/components/PrioritiesDropdown/PrioritiesDropdown";
import DatePicker from "@/components/calendar/DatePicker";
import EmployeeDropdown from "@/components/employee/EmployeeDropdow";
import Textarea from "@/components/Textarea/TextArea";
import { EmployeeData } from "@/api/Employees";
import Header from "@/components/Header/Header";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

// Yup validation schema
const validationSchema = Yup.object({
  taskName: Yup.string().required("სათაური აუცილებელია!"),
  taskDescription: Yup.string()
    .min(2, "აღწერა უნდა იყოს 2-დან 255 სიმბოლომდე!")
    .max(255, "აღწერა უნდა იყოს 2-დან 255 სიმბოლომდე!"),
  departmentId: Yup.string().required("დეპარტამენტი აუცილებელია!"),
  status: Yup.string().required("სტატუსი აუცილებელია!"),
  priority: Yup.string().required("პრიორიტეტი აუცილებელია!"),
  dueDate: Yup.date().nullable(),
});

const AddTask = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // ✅ format dueDate to RFC 3339
    const formattedDueDate = values.dueDate
      ? new Date(values.dueDate).toISOString()
      : null;

    const payload = {
      name: values.taskName,
      description: values.taskDescription,
      department_id: Number(values.departmentId),
      status_id: parseInt(values.status),
      priority_id: parseInt(values.priority),
      due_date: formattedDueDate,
      employee_id: values.selectedEmployee?.id || null,
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
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message || "უცნობი შეცდომა");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.heading}>შექმენი ახალი დავალება</h1>
      <Formik
        initialValues={{
          taskName: "",
          taskDescription: "",
          departmentId: "",
          status: "",
          priority: "",
          dueDate: "",
          selectedEmployee: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className={styles.form}>
            <div className={styles.leftSide}>
              <div className={styles.sawyisi}>
                <label className={styles.label}>სათაური*</label>
                <Field
                  name="taskName"
                  component={NameInput}
                  value={values.taskName}
                  onChange={handleChange}
                />
                <ErrorMessage name="taskName" component="div" className={styles.error} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>აღწერა</label>
                <Field
                  name="taskDescription"
                  component={Textarea}
                  value={values.taskDescription}
                  onChange={handleChange}
                />
                <ErrorMessage name="taskDescription" component="div" className={styles.error} />
              </div>
              <div className={styles.pr}>
                <div className={styles.priority}>
                  <label className={styles.label}>პრიორიტეტი*</label>
                  <Field
                    name="priority"
                    component={PrioritiesDropdown}
                    value={values.priority}
                    onChange={(id: string) => setFieldValue("priority", id)}
                  />
                  <ErrorMessage name="priority" component="div" className={styles.error} />
                </div>
                <div className={styles.statues}>
                  <label className={styles.label}>სტატუსი*</label>
                  <Field
                    name="status"
                    component={StatusDropdown}
                    value={values.status}
                    onChange={(id: string) => setFieldValue("status", id)}
                  />
                  <ErrorMessage name="status" component="div" className={styles.error} />
                </div>
              </div>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.sawyisi}>
                <label className={styles.label}>დეპარტამენტი*</label>
                <Field
                  name="departmentId"
                  component={DepartmentDropdown}
                  value={values.departmentId}
                  onChange={(id: string) => setFieldValue("departmentId", id)}
                />
                <ErrorMessage name="departmentId" component="div" className={styles.error} />
              </div>

              <div className={styles.RinputGroup}>
                <label className={styles.label}>თანამშრომელი</label>
                <Field
                  name="selectedEmployee"
                  component={EmployeeDropdown}
                  value={values.selectedEmployee}
                  onChange={(employee: EmployeeData) => setFieldValue("selectedEmployee", employee)}
                />
              </div>

              <div className={styles.RinputGroup}>
                <label className={styles.label}>დასრულების თარიღი</label>
                <Field
                  name="dueDate"
                  component={DatePicker}
                  value={values.dueDate}
                  onChange={(date: string) => setFieldValue("dueDate", date)}
                />
              </div>

              {errorMessage && <div className={styles.error}>{errorMessage}</div>}
              {successMessage && <div className={styles.success}>{successMessage}</div>}

              <div className={styles.button}>
                <Button3 text="დავალების დამატება" disabled={isSubmitting} type="submit" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;
