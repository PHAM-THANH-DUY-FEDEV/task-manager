import React, { useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";

const FilterBar = ({ statusSelected }) => {
  return (
    <div className="mx-4 mb-8 flex gap-4">
      <ButtonSelect
        statusButton="all"
        statusCurrent={statusSelected}
        textButton="Tất Cả Task"
      ></ButtonSelect>
      <ButtonSelect
        statusButton="done"
        statusCurrent={statusSelected}
        textButton="Hoàn Thành"
      ></ButtonSelect>
      <ButtonSelect
        statusButton="todo"
        statusCurrent={statusSelected}
        textButton="Vừa Tạo"
      ></ButtonSelect>
      <ButtonSelect
        statusButton="inprocess"
        statusCurrent={statusSelected}
        textButton="Đang Làm"
      ></ButtonSelect>
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
export default FilterBar;
