"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./Comments.module.scss";
import Button3 from "../Buttons/Button3/Button3";
import { postComment } from "@/api/comments/postComment";
import CommentsSection from "../CommentsSection/CommentsSection";
import { getComments } from "@/api/comments/getComments";
import { CommentType } from "@/types";

const Comment = ({
  taskId,
  initialComments,
}: {
  taskId: string;
  initialComments: CommentType[];
}) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getComments(taskId);
      if (response) {
        setComments(response);
      } else {
        setError("Failed to load comments");
      }
    } finally {
      setLoading(false);
    }
  }, [taskId]); // <-- Depends only on taskId

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleComment = async () => {
    if (!text.trim()) return;

    try {
      const response = await postComment(taskId, text);

      if (response) {
        console.log("კომენტარი დაემატა:", response);
        fetchComments(); // refresh comments
        setText(""); // clear textarea
      } else {
        console.error("კომენტარის დამატება ვერ მოხერხდა");
      }
    } catch (error) {
      console.error("Error in handleComment:", error);
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        <CommentsSection taskId={taskId} comments={comments} />
      </div>
    </div>
  );
};

export default Comment;
