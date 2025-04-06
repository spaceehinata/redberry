const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e85a2d7-4757-4769-9e4e-f7d01e4f8d08";

export const postComment = async (taskId: string, text: string) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        text, // კომენტარი
      }),
    });

    // Response-ს სტატუსის შემოწმება
    if (!response.ok) {
      throw new Error(`Failed to post comment. Status: ${response.status}`);
    }

    // JSON პასუხის მიღება
    const newComment = await response.json();
    return newComment; // დაბრუნდება ახალი კომენტარი
  } catch (error) {
    console.error("Error posting comment:", error);
    return null; // შეცდომის შემთხვევაში null უკან
  }
};
