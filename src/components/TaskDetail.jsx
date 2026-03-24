import { Calendar } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "./contexts/TaskContext";

const TaskDetail = ({ id, title, description, deadline, status }) => {
  const { setTasks, updateTaskStatus, tasks, getDeadlineStatus } =
    useContext(TaskContext);
  const currentTask = tasks.find((t) => t.id === id);
  const dateInfo = getDeadlineStatus(deadline);

  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    setForm({
      title: title || "",
      description: description || "",
      deadline: deadline || "",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    );
  };

  return (
    <div className="w-full p-4 space-y-4">
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="w-full text-3xl font-bold outline-none focus:border-orange-400"
      />

      <div className="flex items-center gap-3 ">
        <p className="text-md font-semibold">Dealine: </p>

        <input
          type="date"
          name="deadline"
          value={currentTask?.deadline}
          onChange={handleChange}
          className="border-b outline-none bg-transparent"
        />
        {dateInfo === "Cận Dealine" && (
          <div className="text-xs px-2 py-2 bg-yellow-200 text-black font-semibold rounded-full">
            Sắp đến hạn
          </div>
        )}

        {dateInfo === "Quá hạn" && (
          <div className="text-xs px-2 py-2 bg-red-300 text-white rounded-full">
            Quá hạn
          </div>
        )}
      </div>
      <div className="flex gap-2 font-semibold">
        <ButtonSelect
          statusButton="Hoàn Thành"
          statusCurrent={currentTask?.status}
          textButton="Hoàn Thành"
          onUpdate={updateTaskStatus}
          idTask={id}
        ></ButtonSelect>
        <ButtonSelect
          statusButton="Vừa tạo"
          statusCurrent={currentTask?.status}
          textButton="Vừa Tạo"
          onUpdate={updateTaskStatus}
          idTask={id}
        ></ButtonSelect>
        <ButtonSelect
          statusButton="Đang Làm"
          statusCurrent={currentTask?.status}
          textButton="Đang Làm"
          onUpdate={updateTaskStatus}
          idTask={id}
        ></ButtonSelect>
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full h-auto min-h-[500px] rounded-lg outline-none focus:none resize-none"
      />
    </div>
  );
};
const ButtonSelect = ({
  idTask,
  statusButton,
  statusCurrent,
  textButton,
  onUpdate,
}) => {
  return (
    <button
      className={`rounded-md py-1.5 px-2 cursor-pointer text-sm ${statusCurrent === statusButton ? "bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white" : "text-black bg-white border border-[#ffa32c]"} hover:bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] hover:text-white`}
      onClick={() => {
        onUpdate(idTask, statusButton);
      }}
    >
      {textButton}
    </button>
  );
};

export default TaskDetail;
