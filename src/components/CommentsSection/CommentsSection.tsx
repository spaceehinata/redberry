// src/components/CommentsSection/CommentsSection.tsx

"use client";

import CommentTree from "../CommentTree/CommentTree";
import { CommentType } from "@/types"; // ან კონკრეტული ფაილიდან სადაც `CommentType` არის განსაზღვრული

const CommentsSection = ({
  comments,
}: {
  taskId: string;
  comments: CommentType[]; // Change type here from string to CommentType[]
}) => {
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
