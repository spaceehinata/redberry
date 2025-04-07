// src/components/CommentTree/CommentTree.tsx

"use client";

import React, { useState } from "react";
import { CommentType } from "@/types";
import Button4 from "@/components/Buttons/Button4/Button4";
import styles from "./CommentTree.module.scss";
import Button1 from "@/components/Buttons/Button1/Button1";

const API_TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const CommentTree = ({ comment }: { comment: CommentType }) => {
  const [isReplying, setIsReplying] = useState(false); // Toggle for reply textarea
  const [replyText, setReplyText] = useState(""); // Store the reply text
  const [subComments, setSubComments] = useState(comment.sub_comments || []); // Store the sub-comments (replies)

  // Toggle the visibility of the reply textarea
  const toggleReplyTextarea = () => {
    setIsReplying(!isReplying);
  };

  // Handle the reply text change as user types
  const handleReplyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  // Submit a new reply to the comment
  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;

    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${comment.task_id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: replyText,
            parent_id: comment.id, // Mark it as a reply to this comment
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to post sub-comment");

      const newReply = await response.json(); // Get the new reply from the response
      setSubComments((prev) => [...prev, newReply]); // Add new reply to the sub-comments list
      setReplyText(""); // Clear the textarea
      setIsReplying(false); // Hide the reply textarea after submission
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <img
          className={styles.avatar}
          src={comment.author_avatar}
          alt={comment.author_nickname}
        />
        <div className={styles.commentContent}>
          <p className={styles.author}>{comment.author_nickname}</p>
          <p className={styles.commentText}>{comment.text}</p>

          {/* Reply Button */}
          <Button4
            text={isReplying ? "Cancel" : "Reply"}
            onClick={toggleReplyTextarea}
          />
        </div>
      </div>

      {/* Reply Text Area */}
      {isReplying && (
        <div className={styles.replyForm}>
          <textarea
            className={styles.replyTextArea}
            placeholder="Write your reply..."
            value={replyText}
            onChange={handleReplyTextChange}
            rows={3}
          />
          <div className={styles.replyActions}>
            <Button1 text="Submit" onClick={handleSubmitReply} />
          </div>
        </div>
      )}

      {/* Display Sub-comments (Replies) */}
      {subComments.length > 0 && (
        <div className={styles.subComments}>
          {subComments.map((subComment) => (
            <div key={subComment.id} className={styles.subComment}>
              <div className={styles.subCommentHeader}>
                <img
                  className={styles.avatar}
                  src={subComment.author_avatar}
                  alt={subComment.author_nickname}
                />
                <div className={styles.commentContent}>
                  <p className={styles.author}>{subComment.author_nickname}</p>
                  <p className={styles.commentText}>{subComment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentTree;
