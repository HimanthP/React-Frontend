import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "./TaskList";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const stored = (() => {
    try {
      const raw = window.localStorage.getItem("task-app-tasks");
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  })();

  const task = stored.find((t) => String(t.id) === String(id));

  const handleBack = () => {
    navigate("/challenge/21-react-router");
  };

  if (!task) {
    return (
      <div id="task-detail-page">
        <p>Task not found.</p>
        <button id="task-detail-back" type="button" onClick={handleBack}>
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div id="task-detail-page">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? "Completed" : "Active"}</p>
      <p>Category: {task.category}</p>
      {task.tags.length > 0 && <p>Tags: {task.tags.join(", ")}</p>}
      {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
      <button id="task-detail-back" type="button" onClick={handleBack}>
        Back to list
      </button>
    </div>
  );
}