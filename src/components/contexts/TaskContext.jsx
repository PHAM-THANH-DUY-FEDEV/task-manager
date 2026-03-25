import { Children, createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const data = localStorage.getItem("tasks");

      if (!data || data === "undefined") return [];

      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [showPoppup, setShowPoppup] = useState(false);
  const [statisData, setStatisData] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [taskSelected, setTaskSelected] = useState(() => {
    const data = localStorage.getItem("taskSelected");
    return data ? JSON.parse(data) : null;
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSearchTask = (value) => {
    setSearchTerm(value);
    const query = value.toLowerCase();
    const filtered = tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesTitle = task.title.toLowerCase().includes(query);
      return matchesStatus && matchesTitle;
    });
    setFilteredTasks(filtered);
  };

  const handleGetStatis = () => {
    const result = tasks.reduce(
      (acc, task) => {
        if (task.status === "Hoàn Thành") acc.Complete++;
        if (task.status === "Vừa Tạo") acc.Todo++;
        if (task.status === "Đang Làm") acc.Process++;
        acc.Total++;
        return acc;
      },
      { Complete: 0, Todo: 0, Process: 0, Total: 0 },
    );
    setStatisData(result);
    console.log(result);
  };

  const handleFilterTask = (status) => {
    setStatusFilter(status);
    if (status === "all") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === status);
      setFilteredTasks(filtered);
    }
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const onDeleteTask = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa task?")) return;
    setTasks((prev) => {
      const updated = prev.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    });
    localStorage.removeItem("taskSelected");
  };

  const onSelected = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTaskSelected(task);
    localStorage.setItem("taskSelected", JSON.stringify(task));
    console.log(taskSelected);
    setShowAddForm(false);
    return;
  };

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const due = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffDays = (due - today) / (1000 * 60 * 60 * 24);
    if (diffDays < 0) return "Quá hạn";
    if (diffDays <= 1) return "Cận Dealine";
    return "";
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    handleFilterTask(statusFilter);
    handleSearchTask(searchTerm);
    handleGetStatis();
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        updateTaskStatus,
        onDeleteTask,
        onSelected,
        taskSelected,
        showAddForm,
        setShowAddForm,
        getDeadlineStatus,
        filteredTasks,
        handleFilterTask,
        handleSearchTask,
        showPoppup,
        setShowPoppup,
        statisData,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
