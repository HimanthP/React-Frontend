import { useMemo } from "react";
import type { Task } from "./TaskList";

interface StatsPanelProps {
  tasks?: Task[];
}

export default function StatsPanel({
  tasks = [],
}: StatsPanelProps) {
  const stats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const active = total - completed;

    const overdue = tasks.filter((task) => {
      if (task.completed || !task.dueDate) {
        return false;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      return dueDate < today;
    }).length;

    const percentage =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      active,
      overdue,
      percentage,
    };
  }, [tasks]);

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Active: {stats.active}</p>
      <p>Overdue: {stats.overdue}</p>
      <p>Completion Rate: {stats.percentage}%</p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={stats.percentage}
      >
        {stats.percentage}%
      </div>
    </section>
  );
}