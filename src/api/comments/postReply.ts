// src/api/comments/postReply.ts
import { API_URL, getAuthHeaders } from "@/api/apiConfig";

export const postReply = async (data: { commentId: number; text: string; taskId: number }): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/comments/reply`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        commentId: data.commentId,
        text: data.text,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to post reply: Status ${response.status}, ${errorText}`);
      throw new Error(`Failed to post reply: Status ${response.status}, ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error("Error posting reply:", error);
    return false;
  }
};