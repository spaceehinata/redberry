// src/components/Comment/Comment.tsx

"use client";

import React, { useState } from "react";
import styles from "./Comments.module.scss";
import Button3 from "../Buttons/Button3/Button3";
import { postComment } from "@/api/comments/postComment";
import CommentsSection from "../CommentsSection/CommentsSection";

const Comment = ({ taskId }: { taskId: string }) => {
  const [text, setText] = useState("");

  const handleComment = async () => {
    if (!text.trim()) return;

    try {
      const response = await postComment(taskId, text);

      if (response) {
        console.log("კომენტარი დაემატა:", response);
        setText("");
      } else {
        console.error("კომენტარის დამატება ვერ მოხერხდა");
      }
    } catch (error) {
      console.error("Error in handleComment:", error);
    }
  };

  return (
  <div className={styles.commentColumn}> 
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        placeholder="დააკომენტარე"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.buttonWrapper}>
        <Button3 text="დააკომენტარე" onClick={handleComment} />
      </div>
    </div>
    <div className={styles.commentHeader}>
      <p>კომენტარები</p>
    </div>
              
    <div className={styles.commentsSection}>      
        <CommentsSection taskId={taskId} /> 
    </div>
  </div>
  );
};

export default Comment;
