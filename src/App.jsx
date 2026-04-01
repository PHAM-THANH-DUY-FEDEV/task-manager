import { useState } from "react";

import "./App.css";
import IndexPage from "./components/IndexPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JournalPage from "./components/JournalPage";
import LearnedPage from "./components/LearnedPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/journal" element={<JournalPage />} />

        <Route path="/learned" element={<LearnedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
