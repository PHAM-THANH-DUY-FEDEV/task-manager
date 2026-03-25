import React, { useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";
import { Pencil, Trash2 } from "lucide-react";

const TaskItem = (props) => {
  const { onDeleteTask, onSelected, getDeadlineStatus, setShowPoppup } =
    useContext(TaskContext);
  const dateInfo = getDeadlineStatus(props.deadline);

  return (
    <div
      id={props.id}
      className="relative flex flex-col bg-amber-50 mx-4 md:w-[300px] rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer shadow-sm border border-amber-100 "
      onClick={() => {
        setShowPoppup(true);
        onSelected(props.id);
      }}
    >
      <div className="flex gap-2 font-semibold absolute left-4 z-10">
        <div className="relative rounded-lg top-[-15px] flex justify-center items-center py-2 px-3 min-w-[80px] text-xs bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white shadow-md capitalize">
          {props.status}
        </div>

        {dateInfo === "Cận Dealine" && (
          <div className="relative top-[-15px] text-[10px] px-3 py-2 bg-yellow-300 text-black font-bold rounded-lg shadow-sm flex items-center">
            Sắp đến hạn
          </div>
        )}

        {dateInfo === "Quá hạn" && (
          <div className="relative top-[-15px] text-[10px] px-3 py-2 bg-red-500 text-white font-bold rounded-lg shadow-sm flex items-center">
            Quá hạn
          </div>
        )}
      </div>

      <div className="p-5 pt-8 flex-1">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {props.title}
        </h3>
        <div className="text-[#ffa32c] text-sm font-semibold mb-2">
          {props.deadline}
        </div>
        <p className="text-gray-600 py-2 text-sm leading-relaxed line-clamp-4  h-[60px] md:h-[100px]">
          {props.description || "Chưa có mô tả cho công việc này..."}
        </p>
      </div>

      <div className="pb-4 px-4 flex justify-end">
        <button
          className="transition-all w-8 h-8 flex items-center justify-center rounded-full text-white bg-orange-400 hover:bg-red-500 shadow-sm active:scale-90"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(props.id);
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
export default TaskItem;
