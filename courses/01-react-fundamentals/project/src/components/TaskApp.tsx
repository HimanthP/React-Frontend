import type { Dispatch, SetStateAction } from "react"
import TaskList from "./TaskList"
import type { Task } from "./TaskList"

interface TaskAppProps {
  tasks?: Task[]
  setTasks?: Dispatch<SetStateAction<Task[]>>
  dispatch?: (action: { type: string; payload?: unknown }) => void
  showForm?: boolean
  countFormat?: string
  showFilterBar?: boolean
  showStatsPanel?: boolean
  onDelete?: (id: string | number) => void
  linkToTaskDetail?: boolean
}

export default function TaskApp({
  tasks,
  countFormat = "tasks",
}: TaskAppProps) {
  const count = tasks?.length ?? 0

  const countText =
    countFormat === "tasks"
      ? `${count} Tasks`
      : `${count} ${countFormat}`

  return (
    <section>
      <h2 id="task-count">{countText}</h2>

      <TaskList tasks={tasks} />
    </section>
  )
}