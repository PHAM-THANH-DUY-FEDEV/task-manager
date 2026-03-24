import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "./contexts/TaskContext";

const TaskList = () => {
  const { filteredTasks, setTasks } = useContext(TaskContext);

  return (
    <div className="flex gap-4 flex-wrap mt-4 justify-center">
      {filteredTasks?.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          status={task.status}
        />
      ))}
    </div>
  );
};

export default TaskList;
