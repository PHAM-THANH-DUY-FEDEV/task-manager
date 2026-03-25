import React, { useContext, useEffect, useState } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "./contexts/TaskContext";
import TaskDetail from "./TaskDetail";
import { Plus, Trash2, X } from "lucide-react";
import AddTaskForm from "./AddTaskForm";
import FilterBar from "./FilterBar";
import Statis from "./Statis";

const IndexPage = () => {
  const {
    tasks,
    setTasks,
    taskSelected,
    showAddForm,
    setShowAddForm,
    setShowPoppup,
    handleSearchTask,
    onDeleteTask,
    showPoppup,
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

  useEffect(() => {
    if (showPoppup) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [showPoppup]);
  return (
    <div
      className={`w-full min-h-screen bg-gray-50   flex-col ${showPoppup ? "no-scroll" : ""}`}
    >
      <div className="w-full flex flex-col ">
        <div className="w-full p-4">
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              handleSearchTask(e.target.value);
            }}
            placeholder="Tìm kiếm công việc..."
            className="w-full p-3 md:p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400 border-[#ffa32c] transition-all"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 mb-4">
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto my-2">
            <div className="flex">
              <FilterBar></FilterBar>
            </div>

            <div className="flex-1">
              <Statis></Statis>
            </div>
          </div>
          <div>
            <button
              className="w-full md:w-auto py-2 px-6 flex gap-2 justify-center items-center cursor-pointer bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white hover:opacity-90 rounded-full shadow-md transition-all active:scale-95"
              onClick={() => {
                setShowAddForm(true);
                setShowPoppup(true);
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
      {showPoppup && (showAddForm || taskSelected) && (
        <div className="fixed top-[-10px] md:top-0 inset-0 z-50 flex flex-col items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm touch-none"
            onClick={() => {
              setShowAddForm(false);
              setShowPoppup(false);
            }}
          ></div>
          <div
            className="relative md:w-[800px] bg-white rounded-xl shadow-2xl flex flex-col max-h-[85dvh] animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end gap-3 p-5 pb-2 bg-white rounded-t-xl sticky top-0">
              {taskSelected && !showAddForm && (
                <button
                  className="p-2.5 rounded-full border border-[#ffa32c] text-[#ffa32c] hover:bg-red-50 transition-colors"
                  onClick={() => {
                    onDeleteTask(taskSelected.id);
                    setShowPoppup(false);
                  }}
                >
                  <Trash2 size={20} />
                </button>
              )}
              <button
                className="p-2.5 rounded-full bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white shadow-lg active:scale-95 hover:opacity-80 transition-all"
                onClick={() => {
                  setShowAddForm(false);
                  setShowPoppup(false);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 pt-0 custom-scrollbar min-w-[40vh]">
              <div>
                {showAddForm ? (
                  <AddTaskForm onAdd={handleAddTask} />
                ) : (
                  <TaskDetail {...taskSelected} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
