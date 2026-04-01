import React, { useContext, useEffect, useState } from "react";
import { JournalContext } from "./contexts/JournalContext";

const JournalDetail = () => {
  const { journalSelected, updateJournal, deleteJournal, setShowJournalPopup } =
    useContext(JournalContext);

  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(journalSelected?.content || "");
  }, [journalSelected]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    updateJournal(journalSelected.id, value);
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="px-3 py-1 bg-orange-100 text-[#fe8c00] text-[10px] font-black uppercase tracking-widest rounded-full">
            Chi tiết nhật ký
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
            {journalSelected?.title}
          </h2>
        </div>
        <button
          onClick={() => setShowJournalPopup(false)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
        >
          ✕
        </button>
      </div>

      <div className="relative group">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-[400px] border-2 border-slate-50 bg-slate-50 rounded-[2rem] p-6 text-slate-700 leading-relaxed outline-none focus:border-[#ffa32c]/30 focus:bg-white transition-all resize-none shadow-inner"
          placeholder="Viết nội dung tại đây..."
        />
        <div className="absolute bottom-4 right-6 pointer-events-none opacity-20 group-focus-within:opacity-0 transition-opacity">
          ✍️
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => {
            if (window.confirm("Xóa nhật ký này?")) {
              deleteJournal(journalSelected.id);
              setShowJournalPopup(false);
            }
          }}
          className="px-6 py-3 text-slate-400 font-bold hover:text-red-500 transition-colors text-sm"
        >
          Xóa bỏ
        </button>

        <button
          onClick={() => setShowJournalPopup(false)}
          className="px-8 py-3 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white font-black rounded-2xl shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
        >
          Hoàn tất
        </button>
      </div>
    </div>
  );
};

export default JournalDetail;
