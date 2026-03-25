import React, { useContext, useState } from "react";
import { TaskContext } from "./contexts/TaskContext";

const FilterBar = () => {
  const [statusSelected, setStatusSelected] = useState("all");
  return (
    <div className="flex gap-4">
      <ButtonSelect
        statusButton="all"
        statusCurrent={statusSelected}
        textButton="Tất Cả Task"
        handdleChangeButton={() => {
          setStatusSelected("all");
        }}
      ></ButtonSelect>
      <ButtonSelect
        statusButton="Hoàn Thành"
        statusCurrent={statusSelected}
        textButton="Hoàn Thành"
        handdleChangeButton={() => {
          setStatusSelected("Hoàn Thành");
        }}
      ></ButtonSelect>
      <ButtonSelect
        statusButton="Vừa Tạo"
        statusCurrent={statusSelected}
        textButton="Vừa Tạo"
        handdleChangeButton={() => {
          setStatusSelected("Vừa Tạo");
        }}
      ></ButtonSelect>
      <ButtonSelect
        statusButton="Đang Làm"
        statusCurrent={statusSelected}
        textButton="Đang Làm"
        handdleChangeButton={() => {
          setStatusSelected("Đang Làm");
        }}
      ></ButtonSelect>
    </div>
  );
};

const ButtonSelect = ({
  statusButton,
  statusCurrent,
  textButton,
  handdleChangeButton,
}) => {
  const { handleFilterTask } = useContext(TaskContext);
  return (
    <button
      className={`rounded-full py-1.5 md:py-2 px-4 font-semibold cursor-pointer text-sm text-black transition-all ${statusCurrent === statusButton ? "bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white" : " text-[#ffa32c] border border-[#ffa32c]"} hover:bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] hover:text-white`}
      onClick={() => {
        handleFilterTask(statusButton);
        handdleChangeButton();
      }}
    >
      {textButton}
    </button>
  );
};
export default FilterBar;
