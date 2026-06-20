import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChallengeList from "./components/ChallengeList";
import TaskList from "./components/TaskList";
import TaskApp from "./components/TaskApp";
import TaskDetailPage from "./components/TaskDetailPage";
import FetchDemoView from "./components/FetchDemoView";
import { ThemeProvider } from "./contexts/ThemeContext";
import { taskReducer, deleteTask } from "./reducers/taskReducer";
import type { Task } from "./components/TaskList";
import type { TaskAction } from "./reducers/taskReducer";

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "First Task", description: "Description one", priority: "High", completed: false, category: "Work", tags: ["important"] },
  { id: 2, title: "Second Task", description: "Description two", priority: "Medium", completed: false, category: "Personal", tags: ["home"] },
  { id: 3, title: "Third Task", description: "Description three", priority: "Low", completed: false, category: "General", tags: [] },
  { id: 4, title: "Fourth Task", description: "Description four", priority: "Medium", completed: false, category: "Work", tags: ["office"] },
  { id: 5, title: "Fifth Task", description: "Description five", priority: "High", completed: false, category: "Personal", tags: ["urgent", "family"] },
];

function AppContent() {
  // @customHook
  const [storedTasks, setStoredTasks] = useLocalStorage("task-app-tasks", INITIAL_TASKS);
  const [tasks, dispatch] = useReducer(taskReducer, storedTasks);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  const handleDispatch = useCallback((action: TaskAction) => {
    dispatch(action);
  }, [dispatch]);

  const handleDelete = useCallback((id: string | number) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  const memoizedTasks = useMemo(() => tasks, [tasks]);

  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<ChallengeList />} />
            <Route path="/challenge/01-static-task-display" element={<TaskList />} />
            <Route path="/challenge/02-dynamic-task-rendering" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm={false} />} />
            <Route path="/challenge/03-adding-new-tasks" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm />} />
            <Route path="/challenge/04-task-completion-toggle" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm />} />
            <Route path="/challenge/05-task-deletion" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm onDelete={handleDelete} />} />
            <Route path="/challenge/06-task-filtering" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar />} />
            <Route path="/challenge/07-priority-based-sorting" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar />} />
            <Route path="/challenge/08-task-editing" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar />} />
            <Route path="/challenge/09-search-functionality" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar />} />
            <Route path="/challenge/10-useeffect-local-storage" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar />} />
            <Route path="/challenge/11-useeffect-debounced-search" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar />} />
            <Route path="/challenge/12-categories-and-tags" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar />} />
            <Route path="/challenge/14-task-statistics-dashboard" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm showFilterBar showStatsPanel />} />
            <Route path="/challenge/21-react-router" element={<TaskApp tasks={memoizedTasks} dispatch={handleDispatch} showForm linkToTaskDetail />} />
            <Route path="/challenge/21-react-router/task/:id" element={<TaskDetailPage />} />
            <Route path="/challenge/22-data-fetching" element={<FetchDemoView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const App = React.memo(function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
});

export default App;