import React, { useContext, useEffect, useState } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "./contexts/TaskContext";
import TaskDetail from "./TaskDetail";
import { Plus } from "lucide-react";
import AddTaskForm from "./AddTaskForm";
import FilterBar from "./FilterBar";

const IndexPage = () => {
  const {
    tasks,
    setTasks,
    taskSelected,
    showAddForm,
    setShowAddForm,
    handleSearchTask,
  } = useContext(TaskContext);
  console.log(tasks);
  const handleAddTask = (task) => {
    console.log(tasks);
    const newTask = {
      ...task,
      id: Date.now(),
      status: "Vừa Tạo",
    };

    setTasks((prevTasks) => {
      const safeTasks = Array.isArray(prevTasks) ? prevTasks : [];
      return [...safeTasks, newTask];
    });
  };

  return (
    <div className="w-full h-screen flex gap-2 justify-between">
      <div className="w-full h-full bg-white flex-9/12 flex flex-col ">
        <div className="w-full p-4">
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              handleSearchTask(e.target.value);
            }}
            placeholder="Tìm kiếm công việc..."
            className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400 border-[#ffa32c]"
          />
        </div>
        <div className="flex justify-between">
          <FilterBar></FilterBar>

          <div className="mx-4 mb-8 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white hover:opacity-90 rounded-full ">
            <button
              className="py-1.5 px-4 flex gap-2 justify-center items-center cursor-pointer"
              onClick={() => {
                setShowAddForm(true);
              }}
            >
              <Plus size={20} />
              Thêm Task
            </button>
          </div>
        </div>
        <div>
          <TaskList></TaskList>
        </div>
      </div>
      <div className="w-full h-full flex-3/12 border-l-2 border-[#ffa32c] shadow-sm">
        <div className="p-2 mt-6">
          {showAddForm ? (
            <AddTaskForm onAdd={handleAddTask} />
          ) : taskSelected ? (
            <TaskDetail
              key={taskSelected.id}
              id={taskSelected.id}
              title={taskSelected.title}
              description={taskSelected.description}
              deadline={taskSelected.deadline}
              status={taskSelected.status}
            ></TaskDetail>
          ) : (
            <div className="p-4 text-gray-400 text-center">
              Chọn một task để xem chi tiết
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ButtonSelect = ({ statusButton, statusCurrent, textButton }) => {
  const { filterTask } = useContext(TaskContext);
  return (
    <button
      className={`rounded-full py-1.5 px-4 font-semibold cursor-pointer text-black transition-all ${statusCurrent === statusButton ? "bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white" : " text-[#ffa32c] border border-[#ffa32c]"} hover:bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] hover:text-white`}
      onClick={() => {
        filterTask(statusButton);
      }}
    >
      {textButton}
    </button>
  );
};

export default IndexPage;
