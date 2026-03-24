import React, { useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";
import { Pencil, Trash2 } from "lucide-react";

const TaskItem = (props) => {
  const { onDeleteTask, onSelected, getDeadlineStatus } =
    useContext(TaskContext);
  const dateInfo = getDeadlineStatus(props.deadline);

  return (
    <div
      id={props.id}
      className="w-full max-w-[280px] bg-amber-50 m-3  rounded-xl hover:shadow-xl relative hover:bottom-2 cursor-pointer shadow-sm"
      onClick={() => {
        onSelected(props.id);
      }}
    >
      <div className="flex gap-2 font-semibold absolute top-[-15px]">
        <div className="rounded-md flex justify-center py-1.5 px-2 min-w-[100px] cursor-pointer text-sm bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white capitalize">
          {props.status}
        </div>
        {dateInfo === "Cận Dealine" && (
          <div className="text-xs px-2 py-2 bg-yellow-200 text-black font-semibold rounded-md">
            Sắp đến hạn
          </div>
        )}

        {dateInfo === "Quá hạn" && (
          <div className="text-xs px-2 py-2 bg-red-300 text-white rounded-md">
            Quá hạn
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xl font-bold pt-4">{props.title}</div>
        <div className="text-[#ffa32c] font-semibold pb-4">
          {props.deadline}
        </div>
        <p className="max-h-2/3 line-clamp-4  min-h-[100px]">
          {props.description}
        </p>
      </div>
      <div className="pb-4 px-4 flex justify-end">
        <button
          className="transition-all w-8 h-8 flex items-center justify-center rounded-full text-white bg-[#ffa32c] hover:bg-red-400"
          onClick={() => onDeleteTask(props.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
