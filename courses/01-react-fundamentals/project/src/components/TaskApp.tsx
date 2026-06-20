import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import FilterBar from "./FilterBar";
import StatsPanel from "./StatsPanel";
import { useTheme } from "../contexts/ThemeContext";
import { addTask, updateTask, toggleTask } from "../reducers/taskReducer";
import type { Task } from "./TaskList";
import type { TaskAction } from "../reducers/taskReducer";

interface TaskAppProps {
  tasks: Task[];
  dispatch: (action: TaskAction) => void;
  showForm?: boolean;
  onDelete?: (id: string | number) => void;
  showFilterBar?: boolean;
  showStatsPanel?: boolean;
}

export default function TaskApp({ tasks, dispatch, showForm, onDelete, showFilterBar, showStatsPanel }: TaskAppProps) {
  const { theme, toggleTheme } = useTheme();

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);

  useEffect(() => {
    if (searchText !== debouncedSearchText) setIsSearching(true);
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText, debouncedSearchText]);

  function handleAddTask(task: Task) {
    dispatch(addTask(task));
  }

  function handleToggle(id: string | number) {
    dispatch(toggleTask(id));
  }

  function handleUpdateTask(id: string | number, updates: { title: string; description: string; priority: string }) {
    if (!updates.title.trim()) return;
    const existing = tasks.find((t) => t.id === id);
    if (!existing) return;
    dispatch(updateTask({ ...existing, ...updates }));
    setEditingId(null);
  }

  const statusFiltered =
    filter === "all" ? tasks : filter === "active" ? tasks.filter((t) => !t.completed) : tasks.filter((t) => t.completed);

  const searchedTasks = statusFiltered.filter((task) => {
    const search = debouncedSearchText.toLowerCase();
    return task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search);
  });

  const priorityValue: Record<string, number> = { High: 3, Medium: 2, Low: 1 };

  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sortOrder === "high") return priorityValue[b.priority] - priorityValue[a.priority];
    if (sortOrder === "low") return priorityValue[a.priority] - priorityValue[b.priority];
    if (sortOrder === "alphabetical") return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    if (sortOrder === "dueDate") {
      const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      return aDate - bDate;
    }
    return 0;
  });

  return (
    <div
      data-theme={theme}
      style={{
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h1>Task Manager</h1>
        <button id="theme-toggle" type="button" onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {showForm && <TaskForm onAddTask={handleAddTask} />}

      {showFilterBar && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          searchText={searchText}
          onSearchChange={setSearchText}
          onClearSearch={() => setSearchText("")}
          isSearching={isSearching}
        />
      )}

      <div id="task-count">Showing {sortedTasks.length} of {tasks.length} tasks</div>

      {showStatsPanel && <StatsPanel tasks={tasks} />}

      {sortedTasks.length === 0 ? (
        <div id="filter-empty-message">No tasks found</div>
      ) : (
        <TaskList
          tasks={sortedTasks}
          onToggle={handleToggle}
          onDelete={onDelete}
          countText={`Showing ${sortedTasks.length} of ${tasks.length} tasks`}
          onUpdateTask={handleUpdateTask}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      )}
    </div>
  );
}