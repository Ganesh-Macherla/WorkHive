import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import HiveHeader from "../components/HiveHeader";
import TaskForm from "../components/TaskForm";
import TaskSection from "../components/TaskSection";

function Hive() {
  const { id } = useParams();

  const [hive, setHive] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchHive = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get(`/hives/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHive(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchHive();
    fetchTasks();
  }, [id]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        {
          title,
          description,
          hive_id: id,
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
        `/tasks/${taskId}/complete`,
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

      await api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/tasks/${editingTaskId}`,
        {
          title: editTitle,
          description: editDescription,
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

      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  if (!hive) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <HiveHeader
        hive={hive}
        taskCount={tasks.length}
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        <TaskForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleCreateTask={handleCreateTask}
        />

        <TaskSection
          tasks={tasks}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
          startEditing={startEditing}
          editingTaskId={editingTaskId}
          editTitle={editTitle}
          editDescription={editDescription}
          setEditTitle={setEditTitle}
          setEditDescription={setEditDescription}
          handleUpdateTask={handleUpdateTask}
          setEditingTaskId={setEditingTaskId}
        />

      </div>

    </div>
  );
}

export default Hive;