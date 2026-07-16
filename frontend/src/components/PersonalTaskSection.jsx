import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../services/api";

function PersonalTaskSection({
  deadlineFilter,
}) {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  const [editPriority, setEditPriority] =
    useState("medium");

  const [filter, setFilter] = useState("all");
  useEffect(() => {
    if (deadlineFilter) {
      setFilter(deadlineFilter);
    }
}, [deadlineFilter]);

  const [sortBy, setSortBy] = useState("newest");

  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/personal-tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/personal-tasks",
        {
          title,
          description,
          due_date: dueDate || null,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");

      toast.success(
        dueDate
          ? `Created "${title}" • Due ${dueDate}`
          : `Created personal task "${title}"`
      );

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const task = tasks.find(
        (task) => task.id === taskId
      );

      await api.patch(
        `/personal-tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Completed personal task "${task.title}"`
      );

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const task = tasks.find(
        (task) => task.id === taskId
      );

      await api.delete(
        `/personal-tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Deleted personal task "${task.title}"`
      );

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);

    setEditTitle(task.title);

    setEditDescription(
      task.description || ""
    );

    setEditDueDate(
      task.due_date || ""
    );

    setEditPriority(
      task.priority || "medium"
    );
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const oldTask = tasks.find(
        (task) =>
          task.id === editingTaskId
      );

      const oldDueDate =
        oldTask?.due_date;

      const oldPriority =
        oldTask?.priority;

      await api.put(
        `/personal-tasks/${editingTaskId}/edit`,
        {
          title: editTitle,
          description: editDescription,
          due_date:
            editDueDate || null,
          priority: editPriority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingTaskId(null);

      setEditTitle("");
      setEditDescription("");
      setEditDueDate("");
      setEditPriority("medium");

      if (oldPriority !== editPriority) {
        toast.success(
          `Changed priority of "${editTitle}" to ${editPriority}`
        );
      } 
      
      else if (oldDueDate !== editDueDate) {
  if (editDueDate) {
    toast.success(
      `Changed due date of "${editTitle}" to ${editDueDate}`
    );
  } else {
    toast.success(
      `Removed due date from "${editTitle}"`
    );
  }
} 

      else {
        toast.success(
          `Updated personal task "${editTitle}"`
        );
      }

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const filteredTasks = tasks
  .filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        ) ||
      (task.description || "")
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        );

    if (!matchesSearch) {
      return false;
    }

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const tomorrow = new Date(today);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

    const taskDate = task.due_date
      ? new Date(task.due_date)
      : null;

    if (taskDate) {
      taskDate.setHours(
        0,
        0,
        0,
        0
      );
    }

    if (filter === "pending") {
      return task.status === "pending";
    }

    if (filter === "completed") {
      return task.status === "completed";
    }

    if (filter === "overdue") {
      return (
        task.status !== "completed" &&
        taskDate &&
        taskDate < today
      );
    }

    if (filter === "today") {
      return (
        task.status !== "completed" &&
        taskDate &&
        taskDate.getTime() ===
          today.getTime()
      );
    }

    if (filter === "tomorrow") {
      return (
        task.status !== "completed" &&
        taskDate &&
        taskDate.getTime() ===
          tomorrow.getTime()
      );
    }

    return true;
  })
  .sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    }

    if (sortBy === "dueDate") {
      if (!a.due_date) return 1;

      if (!b.due_date) return -1;

      return (
        new Date(a.due_date) -
        new Date(b.due_date)
      );
    }

    return b.id - a.id;
  });

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Personal Tasks
        </h2>

        <p className="text-slate-400 mt-2">
          Manage your work.
        </p>
      </div>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        rows={4}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none mb-5"
      />

      <label className="block text-sm text-slate-400 mb-2">
        Due Date
      </label>

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
      />

      <label className="block text-sm text-slate-400 mb-2">
        Priority
      </label>

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
      >
        <option value="low">
          🟢 Low
        </option>

        <option value="medium">
          🟡 Medium
        </option>

        <option value="high">
          🔴 High
        </option>
      </select>

      <button
        onClick={handleCreateTask}
        className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-4 font-semibold text-lg transition"
      >
        + Create Personal Task
      </button>

      <div className="my-8 border-t border-slate-800"></div>
      
      <div className="space-y-4 mb-8">

        <div className="relative">

          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {searchQuery && (
            <button
              onClick={() =>
                setSearchQuery("")
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white"
          >
            <option value="all">
              All Tasks
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="overdue">
              Overdue
            </option>

            <option value="today">
              Due Today
            </option>

            <option value="tomorrow">
              Due Tomorrow
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white"
          >
            <option value="newest">
              Newest First
            </option>

            <option value="dueDate">
              Due Date
            </option>

            <option value="priority">
              Priority
            </option>
          </select>

        </div>

      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No personal tasks yet.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTasks.map((task) => {
            const today = new Date();

            today.setHours(
              0,
              0,
              0,
              0
            );

            const tomorrow = new Date(today);

            tomorrow.setDate(
              tomorrow.getDate() + 1
            );

            const taskDate = task.due_date
              ? new Date(task.due_date)
              : null;

            if (taskDate) {
              taskDate.setHours(
                0,
                0,
                0,
                0
              );
            }

            const formattedDueDate = taskDate
              ? taskDate.toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )
              : null;

            let displayStatus = task.status;

            let dueDateColor =
              "text-green-400";

            if (
              task.status !== "completed" &&
              taskDate
            ) {

              if (taskDate < today) {

                displayStatus = "overdue";

                dueDateColor =
                  "text-red-400";

              } else if (
                taskDate.getTime() ===
                today.getTime()
              ) {

                displayStatus =
                  "due today";

                dueDateColor =
                  "text-orange-400";

              } else if (
                taskDate.getTime() ===
                tomorrow.getTime()
              ) {

                displayStatus =
                  "due tomorrow";

                dueDateColor =
                  "text-yellow-400";
              }
            }

            return (
              <div
                key={task.id}
                className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-violet-500 hover:shadow-violet-500/10 transition-all"
              >
                {editingTaskId === task.id ? (
                  <>
                    <h3 className="text-2xl font-bold mb-5">
                      Edit Task
                    </h3>

                    <input
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl bg-slate-700 border border-slate-600 px-5 py-4 text-white mb-4"
                    />

                    <textarea
                      rows={4}
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl bg-slate-700 border border-slate-600 px-5 py-4 text-white resize-none mb-4"
                    />

                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) =>
                        setEditDueDate(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl bg-slate-700 border border-slate-600 px-5 py-4 text-white mb-5"
                    />

                    <label className="block text-sm text-slate-400 mb-2">
                      Priority
                    </label>

                    <select
                      value={editPriority}
                      onChange={(e) =>
                        setEditPriority(e.target.value)
                      }
                      className="w-full rounded-xl bg-slate-700 border border-slate-600 px-5 py-4 text-white mb-5"
                    >
                      <option value="low">
                        🟢 Low
                      </option>

                      <option value="medium">
                        🟡 Medium
                      </option>

                      <option value="high">
                        🔴 High
                      </option>
                    </select>

                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdateTask}
                        className="flex-1 bg-violet-600 hover:bg-violet-700 py-3 rounded-xl font-semibold transition"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setEditingTaskId(
                            null
                          )
                        }
                        className="flex-1 bg-slate-600 hover:bg-slate-500 py-3 rounded-xl font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold">
                          {task.title}
                        </h3>

                        <p className="text-slate-400 mt-3">
                          {task.description || "No description provided."}
                        </p>

                        <div className="mt-5 space-y-2">

                          <div>
                            <span className="text-slate-400">
                              Status:
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                displayStatus === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : displayStatus === "overdue"
                                  ? "bg-red-500/20 text-red-400"
                                  : displayStatus === "due today"
                                  ? "bg-orange-500/20 text-orange-400"
                                  : displayStatus === "due tomorrow"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {displayStatus}
                            </span>
                          </div>

                          <div>
                            <span className="text-slate-400">
                              Priority:
                            </span>

                            <span
                              className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${
                                task.priority === "high"
                                  ? "bg-red-500/20 text-red-400"
                                  : task.priority === "medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          {formattedDueDate && (
                            <div>
                              <span className="text-slate-400">
                                Due:
                              </span>

                              <span className={`ml-2 font-semibold ${dueDateColor}`}>
                                {formattedDueDate}
                              </span>
                            </div>
                          )}

                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">

                          {task.status !== "completed" && (
                            <button
                              onClick={() =>
                                handleCompleteTask(task.id)
                              }
                              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
                            >
                              Complete
                            </button>
                          )}

                          <button
                            onClick={() =>
                              startEditing(task)
                            }
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteTask(task.id)
                            }
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
                          >
                            Delete
                          </button>

                        </div>
                      </>
                    )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PersonalTaskSection;