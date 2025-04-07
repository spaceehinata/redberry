import React from "react";
import { ErrorMessage } from "formik";
import styles from "./TextArea.module.scss";

type Props = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
};

const Textarea: React.FC<Props> = ({ name, value, onChange, label }) => {
  return (
    <div className={styles.textareaWrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={styles.textarea}
      />
      <div className={styles.validation}>
        <ErrorMessage name={name}>
          {(msg) => {
            // Check if msg is an object, then return its string representation
            if (typeof msg === "object") {
              return <span className={styles.errorMessage}>Error: {JSON.stringify(msg)}</span>;
            }
            return <span className={styles.errorMessage}>{msg}</span>;
          }}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default Textarea;
