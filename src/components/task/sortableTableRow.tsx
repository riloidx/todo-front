import { useSortable } from "@dnd-kit/react/sortable";
import TaskRow from "./task-row";
import { TaskResponse } from "@/src/types/types";

export default function SortableTaskRow({ task, index }: { task: TaskResponse, index: number }) {
  const { ref, handleRef } = useSortable({ id: task.id, index: index });

  if (task.completed) {
    return <TaskRow task={task} />;
  }

  return (
    <div ref={ref}>
      <TaskRow task={task} handleRef={handleRef} />
    </div>
  );
}
