import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "../services/api";

function PersonalTaskSection() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(`Created personal task "${title}"`);

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const task = tasks.find((task) => task.id === taskId);
      await api.patch(
        `/personal-tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Completed personal task "${task.title}"`);
      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const task = tasks.find((task) => task.id === taskId);
      await api.delete(`/personal-tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Deleted personal task "${task.title}"`);
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
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none mb-5"
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
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-violet-500 hover:shadow-violet-500/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold">
                    {task.title}
                  </h3>

                  <p className="text-slate-400 mt-3">
                    {task.description || "No description provided."}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    task.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
                >
                  ✓ Complete
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonalTaskSection;