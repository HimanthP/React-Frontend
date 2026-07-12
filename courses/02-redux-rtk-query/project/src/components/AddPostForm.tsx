import { FormEvent, useState } from "react";
import { useAddPostMutation } from "../api/apiSlice";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [addPost, { isLoading, isSuccess }] = useAddPostMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) return;

    await addPost({
  userId: 1,
  title,
  body,
}).unwrap();

    setTitle("");
    setBody("");
  };

  return (
    <form
      data-testid="add-post-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button
        data-testid="add-post-submit"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Post"}
      </button>

      {isSuccess && <p>Post added successfully!</p>}
    </form>
  );
}