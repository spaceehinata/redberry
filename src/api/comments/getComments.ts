const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export interface CommentType {
  id: number;
  text: string;
  author_nickname: string;
  author_avatar: string | null;
}

export const getComments = async (taskId: number): Promise<CommentType[]> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/comments/`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const data: CommentType[] = await response.json();

    const mappedComments: CommentType[] = data.map((c) => ({
      id: c.id,
      text: c.text,
      author_nickname: c.author_nickname || "Unknown Author",
      author_avatar: c.author_avatar,
    }));

    return mappedComments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
