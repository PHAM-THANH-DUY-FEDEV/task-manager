import React, { useContext, useState, useEffect } from "react";
import { JournalContext } from "./contexts/JournalContext";
import { useNavigate } from "react-router-dom";
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
    <div className="h-screen flex overflow-hidden">
      <div className="w-1/3 border-r bg-gray-50 flex flex-col">
        <div className="p-4  bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-full hover:opacity-80 active:scale-95 transition-all"
          >
            ← Home
          </button>
        </div>
        <div className="p-4 bg-gray-50">
          <input
            type="text"
            placeholder="Tìm nhật ký..."
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              addJournal("");
            }}
            className="w-full py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-full hover:opacity-80"
          >
            + Thêm nhật ký
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {journals.map((j) => (
            <div
              key={j.id}
              onClick={() => setJournalSelected(j)}
              className={`p-4 rounded-xl cursor-pointer transition shadow-sm
                ${
                  journalSelected?.id === j.id
                    ? "bg-orange-100"
                    : "bg-white hover:shadow-md"
                }`}
            >
              <h3 className="font-semibold">{j.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {!journalSelected ? (
          <div className="text-gray-400 text-center mt-20">
            Chọn một nhật ký để xem chi tiết
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">{journalSelected.title}</h1>

            <textarea
              value={content}
              onChange={handleChange}
              className="w-full h-[300px] p-4 border border-[#ffa32c] rounded-xl outline-none focus:ring-2 focus:ring-orange-400 mb-4 resize-none"
            />

            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Bạn có chắc muốn xóa nhật ký này?",
                );
                if (!confirmDelete) return;

                deleteJournal(journalSelected.id);
                setJournalSelected(null);
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#ffa32c] to-[#fe8c00] text-white rounded-full hover:opacity-80"
            >
              Xóa
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JournalPage;
