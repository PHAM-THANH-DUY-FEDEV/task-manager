import React, { useContext, useState } from "react";
import { TaskContext } from "./contexts/TaskContext";

const AddTaskForm = ({ onAdd }) => {
  const { setShowPoppup } = useContext(TaskContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title) return alert("Nhập tiêu đề!");
    if (!task.deadline) return alert("Chọn deadline!");

    onAdd(task);

    setTask({
      title: "",
      description: "",
      deadline: "",
    });
    setShowPoppup(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex flex-col gap-2">
      <p className="text-xl font-bold text-center">Thêm Công Việc Mới</p>
      <div className="border-b-gray-300 border-b">
        <p className="text-xl font-semibold cursor-default">Tên Task</p>
        <input
          type="text"
          name="title"
          placeholder="Tiêu đề"
          value={task.title}
          onChange={handleChange}
          className="w-full p-2 rounded-lg outline-0"
        />
      </div>
      <div className="border-b-gray-300 border-b ">
        <p className="text-xl font-semibold">Mô tả</p>
        <textarea
          name="description"
          placeholder="Mô tả"
          value={task.description}
          onChange={handleChange}
          className="w-full p-2 outline-none md:min-h-[300px] resize-none"
        />
      </div>
      <div>
        <p className="text-md font-semibold">Dealine</p>
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="w-full p-2 border-b outline-none bg-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full my-2 py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-lg hover:opacity-90 transition"
      >
        Tạo
      </button>
    </form>
  );
};

export default AddTaskForm;
