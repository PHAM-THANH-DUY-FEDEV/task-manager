import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "./contexts/TaskContext";

const TaskList = () => {
  const { filteredTasks } = useContext(TaskContext);

  return (
    <div className="md:p-4 my-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-10">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};
export default TaskList;
