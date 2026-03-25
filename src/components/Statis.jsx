import React, { useContext } from "react";
import { TaskContext } from "./contexts/TaskContext";

const Statis = () => {
  const { statisData } = useContext(TaskContext);
  const total = statisData?.Total || 0;

  const calculateWidth = (value) => (total > 0 ? (value / total) * 100 : 0);

  return (
    <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 md:p-1 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 w-full md:flex-1">
        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">
          Thống kê:
        </span>
        <div className="relative flex-1 min-w-[150px] md:min-w-[200px] h-6 bg-gray-400 rounded-full overflow-hidden shadow-inner flex flex-row-reverse">
          <div
            style={{ width: `${calculateWidth(statisData.Todo)}%` }}
            className="h-full bg-gray-400 transition-all duration-700 ease-out border-l border-white/20 relative"
          >
            {statisData.Todo > 0 && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-black">
                {statisData.Todo}
              </span>
            )}
          </div>

          <div
            style={{ width: `${calculateWidth(statisData.Process)}%` }}
            className="h-full bg-amber-400 transition-all duration-700 ease-out border-l border-white/20 relative"
          >
            {statisData.Process > 0 && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-black">
                {statisData.Process}
              </span>
            )}
          </div>

          <div
            style={{ width: `${calculateWidth(statisData.Complete)}%` }}
            className="h-full bg-green-500 transition-all duration-700 ease-out relative"
          >
            {statisData.Complete > 0 && (
              <span className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-black">
                {statisData.Complete}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 p-2  bg-gray-50 rounded-xl md:bg-transparent border md:border-none w-full md:w-auto">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full shadow-sm"></div>
          <span className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">
            Vừa Tạo
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-sm"></div>
          <span className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">
            Đang Làm
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm"></div>
          <span className="text-[11px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">
            Xong
          </span>
        </div>
      </div>
    </div>
  );
};

export default Statis;
