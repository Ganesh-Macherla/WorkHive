import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../services/api";

function PersonalTaskSection() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

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

      await api.put(
        `/personal-tasks/${editingTaskId}/edit`,
        {
          title: editTitle,
          description: editDescription,
          due_date:
            editDueDate || null,
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

      if (oldDueDate !== editDueDate) {
        if (editDueDate) {
          toast.success(
            `Changed due date of "${editTitle}" to ${editDueDate}`
          );
        } else {
          toast.success(
            `Removed due date from "${editTitle}"`
          );
        }
      } else {
        toast.success(
          `Updated personal task "${editTitle}"`
        );
      }

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

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

      <button
        onClick={handleCreateTask}
        className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl py-4 font-semibold text-lg transition"
      >
        + Create Personal Task
      </button>

      <div className="my-8 border-t border-slate-800"></div>

      {tasks.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No personal tasks yet.
        </div>
      ) : (
        <div className="space-y-6">
          {tasks.map((task) => {
            const formattedDueDate =
              task.due_date
                ? new Date(
                    task.due_date
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : null;

            return (
              <div
                key={task.id}
                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-violet-500 hover:shadow-violet-500/10 transition-all duration-300"
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

                    <div className="flex gap-3">
                      <button
                        onClick={
                          handleUpdateTask
                        }
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
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {task.title}
                        </h3>

                        <p className="text-slate-400 mt-3">
                          {task.description ||
                            "No description provided."}
                        </p>

                        {formattedDueDate && (
                          <p className="text-red-400 mt-2 font-medium">
                            Due: {formattedDueDate}
                          </p>
                        )}
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          task.status ===
                          "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {task.status !==
                        "completed" && (
                        <button
                          onClick={() =>
                            handleCompleteTask(
                              task.id
                            )
                          }
                          className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
                        >
                          ✓ Complete
                        </button>
                      )}

                      <button
                        onClick={() =>
                          startEditing(task)
                        }
                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteTask(
                            task.id
                          )
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
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