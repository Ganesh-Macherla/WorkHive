import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Hive() {
  const { id } = useParams();

  const [hive, setHive] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    console.log("Completing task", taskId);

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

  if (!hive) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Hive Workspace</h1>

      <h2>{hive.name}</h2>

      <p>Room Code: {hive.room_code}</p>

      <p>Hive ID: {hive.id}</p>

      <hr />

      <h2>Create Task</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleCreateTask}>
        Create Task
      </button>

      <hr />

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <button onClick={() => handleCompleteTask(task.id)}>
              Complete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Hive;