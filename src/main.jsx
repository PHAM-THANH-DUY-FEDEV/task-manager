import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskProvider } from "./components/contexts/TaskContext.jsx";
import { JournalProvider } from "./components/contexts/JournalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JournalProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </JournalProvider>
  </StrictMode>,
);
