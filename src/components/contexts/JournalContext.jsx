import React, { createContext, useEffect, useState } from "react";

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [journals, setJournals] = useState(() => {
    try {
      const data = localStorage.getItem("journals");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [journalSelected, setJournalSelected] = useState(null);
  const [showJournalPopup, setShowJournalPopup] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(journals));
  }, [journals]);

  const addJournal = (content) => {
    const newJournal = {
      id: Date.now(),
      title: `Nhật ký ${journals.length + 1} - ${new Date().toLocaleDateString()}`,
      content,
      createdAt: new Date(),
    };

    setJournals((prev) => [...prev, newJournal]);
  };

  const deleteJournal = (id) => {
    setJournals((prev) => prev.filter((j) => j.id !== id));
  };

  const updateJournal = (id, newContent) => {
    setJournals((prev) =>
      prev.map((j) => (j.id === id ? { ...j, content: newContent } : j)),
    );
  };

  const handleSearch = (keyword) => {
    setSearch(keyword.toLowerCase());
  };

  const filteredJournals = journals.filter(
    (j) =>
      j.title.toLowerCase().includes(search) ||
      j.content.toLowerCase().includes(search),
  );

  return (
    <JournalContext.Provider
      value={{
        journals: filteredJournals,
        addJournal,
        deleteJournal,
        updateJournal,
        handleSearch,
        journalSelected,
        setJournalSelected,
        showJournalPopup,
        setShowJournalPopup,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};
