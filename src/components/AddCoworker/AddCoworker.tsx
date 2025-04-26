"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./AddCoworker.module.scss";
import ProfilePhotoUploader from "../PhotoUpload/PhotoUpload";
import Button2 from "../Buttons/Button2/Button2";
import NameInput from "../NameSurname/NameInput";
import Button3 from "../Buttons/Button3/Button3";
import DepartmentDropdown from "../DepartmentDropDown/DepartmentDropdown";

const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

interface AddCoworkerProps {
  onClose: () => void;
}

const AddCoworker: React.FC<AddCoworkerProps> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!firstName || !lastName || !departmentId || !photo) {
      setErrorMessage("All fields are required");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", firstName);
    formData.append("surname", lastName);
    formData.append("department_id", departmentId.toString());
    formData.append("avatar", photo);

    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, ${responseText}`
        );
      }

      setSuccessMessage("Employee added successfully!");
      setErrorMessage(null);

      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(`Failed to add employee: ${error.message}`);
      } else {
        setErrorMessage("An unknown error occurred");
      }
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <Image
            src="/asserts/deleteV.svg"
            alt="Close"
            width={24}
            height={24}
          />
        </button>
        <h2 className={styles.h2}>თანამშრომლის დამატება</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <NameInput
                label="სახელი*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <NameInput
                label="გვარი*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.photoUpload}>
            <div className={styles.name}>ავატარი*</div>
            <ProfilePhotoUploader onPhotoChange={(file) => setPhoto(file)} />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.dropdownContainer}>
              <DepartmentDropdown
                onDepartmentChange={(id) => setDepartmentId(id)}
              />
            </div>
          </div>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {successMessage && (
            <div className={styles.success}>{successMessage}</div>
          )}
          <div className={styles.buttonGroup}>
            <Button2 onClick={onClose}>გაუქმება</Button2>
            <Button3
              text="თანამშრომლის დამატება"
              disabled={
                !firstName ||
                !lastName ||
                !departmentId ||
                !photo ||
                isSubmitting
              }
              onClick={() => handleSubmit()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoworker;
