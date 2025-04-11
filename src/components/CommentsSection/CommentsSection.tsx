// src/components/CommentsSection/CommentsSection.tsx

"use client";

// import React, { useState, useEffect } from "react";
// import { getComments } from "@/api/comments/getComments";
import CommentTree from "../CommentTree/CommentTree";
// import { CommentType } from "@/types";

const CommentsSection = ({
  taskId,
  comments,
}: {
  taskId: string;
  comments: string;
}) => {
  // const [comments, setComments] = useState<CommentType[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // const fetchComments = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await getComments(taskId);
  //     if (response) {
  //       setComments(response);
  //     } else {
  //       setError("Failed to load comments");
  //     }
  //   } catch (error) {
  //     setError("Error fetching comments");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, [taskId]);

  // if (loading) {
  //   return <div>Loading comments...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentTree key={comment.id} comment={comment} />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default CommentsSection;
