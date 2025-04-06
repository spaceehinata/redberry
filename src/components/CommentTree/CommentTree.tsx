import React, { useState } from "react";
import { CommentType } from "@/types";
import styles from "./CommentTree.module.scss";

const CommentTree = ({ comment }: { comment: CommentType }) => {
  const [isReplying, setIsReplying] = useState(false); // State to toggle reply text area
  const [replyText, setReplyText] = useState(""); // State to store the reply text

  const handleReplyClick = () => {
    setIsReplying(true); // Show the reply text area
  };

  const handleCancelReply = () => {
    setIsReplying(false); // Hide the reply text area
    setReplyText(""); // Clear the text area
  };

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      // Placeholder for submitting the reply
      console.log(`Submitting reply to comment ID: ${comment.id}`, replyText);
      // You can add logic here to send the reply to a backend or update the comment tree
      setIsReplying(false); // Hide the text area after submission
      setReplyText(""); // Clear the text area
    }
  };

  const handleReplyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value); // Update the reply text as the user types
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <img
          src={comment.author_avatar}
          alt="Author"
          className={styles.avatar}
        />
        <div className={styles.commentContent}>
          <p className={styles.author}>{comment.author_nickname}</p>
          <p className={styles.commentText}>{comment.text}</p>
          <button className={styles.replyButton} onClick={handleReplyClick}>
            Reply
          </button>
        </div>
      </div>

      {/* Reply Text Area */}
      {isReplying && (
        <div className={styles.replyForm}>
          <textarea
            className={styles.replyTextArea}
            value={replyText}
            onChange={handleReplyTextChange}
            placeholder="Write your reply..."
            rows={3}
          />
          <div className={styles.replyActions}>
            <button className={styles.submitButton} onClick={handleSubmitReply}>
              Submit
            </button>
            <button className={styles.cancelButton} onClick={handleCancelReply}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.sub_comments?.length > 0 && (
        <div className={styles.subComments}>
          {comment.sub_comments.map((subComment) => (
            <CommentTree key={subComment.id} comment={subComment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentTree;