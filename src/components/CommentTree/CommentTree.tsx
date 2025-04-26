"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CommentType } from "@/types";
import Button4 from "@/components/Buttons/Button4/Button4";
import styles from "./CommentTree.module.scss";
import Button1 from "@/components/Buttons/Button1/Button1";

const API_TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

const CommentTree = ({ comment }: { comment: CommentType }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [subComments, setSubComments] = useState(comment.sub_comments || []);

  const toggleReplyTextarea = () => {
    setIsReplying(!isReplying);
  };

  const handleReplyTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

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
            parent_id: comment.id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to post sub-comment");

      const newReply = await response.json();
      setSubComments((prev) => [...prev, newReply]);
      setReplyText("");
      setIsReplying(false);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.avatarWrapper}>
          <Image
            className={styles.avatar}
            src={comment.author_avatar}
            alt={comment.author_nickname}
            width={40}
            height={40}
          />
        </div>
        <div className={styles.commentContent}>
          <p className={styles.author}>{comment.author_nickname}</p>
          <p className={styles.commentText}>{comment.text}</p>

          <Button4
            text={isReplying ? "Cancel" : "Reply"}
            onClick={toggleReplyTextarea}
          />
        </div>
      </div>

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

      {subComments.length > 0 && (
        <div className={styles.subComments}>
          {subComments.map((subComment) => (
            <div key={subComment.id} className={styles.subComment}>
              <div className={styles.subCommentHeader}>
                <div className={styles.avatarWrapper}>
                  <Image
                    className={styles.avatar}
                    src={subComment.author_avatar}
                    alt={subComment.author_nickname}
                    width={32}
                    height={32}
                  />
                </div>
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
