import React, { useState } from "react";
import styles from "./TextArea.module.scss";

const Textarea: React.FC = () => {
  const [taskDescription, setTaskDescription] = useState<string>("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(e.target.value); // Update state when text changes
  };

  return (
    <div className={styles.textareaWrapper}>
      <textarea
        name="taskDescription"
        value={taskDescription} // Bind value to the state
        onChange={handleChange} // Call handleChange on change
        className={styles.textarea}
      />
      <div className={styles.validation}></div>
    </div>
  );
};

export default Textarea;
