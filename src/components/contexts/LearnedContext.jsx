import React, { createContext, useEffect, useState } from "react";

export const LearnedContext = createContext();

export const LearnedProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const data = localStorage.getItem("learned");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem("learned", JSON.stringify(items));
  }, [items]);

  const addItem = (data) => {
    const newItem = {
      id: Date.now(),
      ...data,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelected(null);
  };

  const updateItem = (id, newData) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...newData } : i)),
    );
  };

  return (
    <LearnedContext.Provider
      value={{
        items,
        addItem,
        deleteItem,
        updateItem,
        selected,
        setSelected,
      }}
    >
      {children}
    </LearnedContext.Provider>
  );
};
