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

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/personal-tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/personal-tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold mb-6">
        Personal Tasks
      </h2>

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
        <div className="text-center text-slate-400 py-8">
          No personal tasks.
        </div>
      ) : (
        <div className="space-y-5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-800 rounded-xl p-5 border border-slate-700"
            >
              <h3 className="text-xl font-semibold">
                {task.title}
              </h3>

              <p className="text-slate-400 mt-2 mb-4">
                {task.description}
              </p>

              <p className="mb-5">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    task.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
                >
                  Complete
                </button>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
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