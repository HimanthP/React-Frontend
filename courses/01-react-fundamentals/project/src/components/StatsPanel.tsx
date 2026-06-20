import { useMemo } from "react";
import type { Task } from "./TaskList";

interface StatsPanelProps {
  tasks?: Task[];
  total?: number;
  completed?: number;
  active?: number;
  overdue?: number;
}

export default function StatsPanel({
  tasks,
  total,
  completed,
  active,
  overdue,
}: StatsPanelProps) {
  const stats = useMemo(() => {
    if (tasks) {
      const totalTasks = tasks.length;

      const completedTasks = tasks.filter(
        (task) => task.completed
      ).length;

      const activeTasks =
        totalTasks - completedTasks;

      const overdueTasks = tasks.filter(
        (task) => {
          if (
            task.completed ||
            !task.dueDate
          ) {
            return false;
          }

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const dueDate = new Date(
            task.dueDate
          );
          dueDate.setHours(
            0,
            0,
            0,
            0
          );

          return dueDate < today;
        }
      ).length;

      return {
        total: totalTasks,
        completed: completedTasks,
        active: activeTasks,
        overdue: overdueTasks,
      };
    }

    return {
      total: total ?? 0,
      completed: completed ?? 0,
      active: active ?? 0,
      overdue: overdue ?? 0,
    };
  }, [
    tasks,
    total,
    completed,
    active,
    overdue,
  ]);

  const percentage =
    stats.total === 0
      ? 0
      : Math.round(
          (stats.completed /
            stats.total) *
            100
        );

  return (
    <section id="stats-panel">
      <h2>Task Statistics</h2>

      <p>Total: {stats.total}</p>
      <p>
        Completed: {stats.completed}
      </p>
      <p>Active: {stats.active}</p>
      <p>Overdue: {stats.overdue}</p>
      <p>
        Completion Rate: {percentage}%
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        {percentage}%
      </div>
    </section>
  );
}