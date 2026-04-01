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
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">{journalSelected?.title}</h2>

      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-[300px] border rounded-lg p-3 outline-none"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => deleteJournal(journalSelected.id)}
          className="px-4 py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-full hover:opacity-80"
        >
          Xóa
        </button>

        <button
          onClick={() => setShowJournalPopup(false)}
          className="px-4 py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-full hover:opacity-80"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default JournalDetail;
