import { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import type { Task } from "./TaskList";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

export default function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [priority, setPriority] =
    useState("Low");
  const [error, setError] = useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    onAddTask({
      id: Date.now(),
      title,
      description,
      priority,
      completed: false,
      category: "General",
      tags: [],
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Title"
        id="task-title"
        value={title}
        placeholder="Title"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <FormInput
        label="Description"
        id="task-description"
        value={description}
        placeholder="Description"
        textarea
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <label htmlFor="task-priority">
        Priority
      </label>

      <select
        id="task-priority"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">
          Medium
        </option>
        <option value="High">High</option>
      </select>

      {error && (
        <p id="task-form-error">
          {error}
        </p>
      )}

      <Button type="submit">
        Add Task
      </Button>
    </form>
  );
}