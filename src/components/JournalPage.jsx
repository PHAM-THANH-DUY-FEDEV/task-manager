import React, { useContext, useState, useEffect } from "react";
import { JournalContext } from "./contexts/JournalContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const JournalPage = () => {
  const {
    journals,
    addJournal,
    updateJournal,
    deleteJournal,
    handleSearch,
    journalSelected,
    setJournalSelected,
  } = useContext(JournalContext);

  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (journalSelected) {
      setContent(journalSelected.content || "");
    }
  }, [journalSelected]);

  useEffect(() => {
    if (!journalSelected) return;
    const stillExist = journals.find((j) => j.id === journalSelected.id);
    if (!stillExist) {
      setJournalSelected(null);
      setContent("");
    }
  }, [journals, journalSelected]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    if (journalSelected) {
      updateJournal(journalSelected.id, value);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#f8f9fa] overflow-hidden font-sans text-slate-900">
      <div className="w-full md:w-80 border-r border-slate-200 bg-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center text-sm font-bold text-slate-400 hover:text-[#fe8c00] transition-all"
            >
              <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">
                ←
              </span>{" "}
              Home
            </button>
            <button
              onClick={() => addJournal("")}
              className="px-4 py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all"
            >
              + Mới
            </button>
          </div>
          <h1 className="text-xl font-black tracking-tight text-slate-800">
            Nhật ký sáng tạo
          </h1>

          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm ghi chú..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#ffa32c] outline-none transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30">
              🔍
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {journals.map((j) => (
            <div
              key={j.id}
              onClick={() => setJournalSelected(j)}
              className={`p-4 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                journalSelected?.id === j.id
                  ? "bg-orange-50 border-[#fe8c00] shadow-md transform scale-[1.02]"
                  : "bg-white border-slate-50 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              <h3
                className={`font-bold leading-tight ${journalSelected?.id === j.id ? "text-orange-950" : "text-slate-700"}`}
              >
                {j.title || "Ghi chú không tên"}
              </h3>
              <p className="text-[10px] mt-2 text-slate-400 font-medium">
                {new Date(j.id).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f8f9fa] p-5 md:p-10 relative">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {!journalSelected ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
              <div className="text-6xl mb-4">✍️</div>
              <h3 className="text-xl font-black uppercase tracking-tighter">
                Chọn nhật ký để bắt đầu viết
              </h3>
            </div>
          ) : (
            <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] font-black text-[#fe8c00] uppercase tracking-[0.3em] mb-2">
                    Đang chỉnh sửa
                  </p>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                    {journalSelected.title}
                  </h1>
                </div>

                <button
                  className="p-2.5 rounded-full border border-[#ffa32c] text-[#ffa32c] hover:bg-red-50 transition-colors"
                  onClick={() => {
                    if (window.confirm("Xóa vĩnh viễn nhật ký này?")) {
                      deleteJournal(journalSelected.id);
                      setJournalSelected(null);
                    }
                  }}
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-white overflow-hidden flex flex-col">
                <textarea
                  value={content}
                  onChange={handleChange}
                  placeholder="Hôm nay của bạn thế nào?..."
                  className="flex-1 w-full p-8 md:p-12 text-lg text-slate-700 leading-relaxed outline-none resize-none bg-transparent placeholder:italic placeholder:opacity-30"
                />

                <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Tự động lưu...
                  </span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ffa32c] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default JournalPage;
