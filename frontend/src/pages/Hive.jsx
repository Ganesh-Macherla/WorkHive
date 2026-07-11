import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import HiveHeader from "../components/HiveHeader";
import TaskForm from "../components/TaskForm";
import TaskSection from "../components/TaskSection";
import MemberSection from "../components/MemberSection";

function Hive() {
  const { id } = useParams();

  const [hive, setHive] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const currentUsername = localStorage.getItem("username");

  const [members, setMembers] = useState([]);

  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAssignedTo, setEditAssignedTo] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);

      const completed = response.data.filter(
        (task) => task.status === "completed"
      ).length;

      setCompletedCount(completed);

      setPendingCount(
        response.data.length - completed
      );
          } catch (error) {
            console.log(error.response);
          }
        };

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        `/hives/${id}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMembers(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

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
    fetchMembers();
  }, [id]);

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        {
          title,
          description,
          hive_id: id,
          assigned_to: assignedTo || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setAssignedTo("");

      const member = members.find(
        (member) =>
          member.id === Number(assignedTo)
      );

      if (member) {
        toast.success(`Assigned "${title}" to ${member.username}`);
      } else {
        toast.success(`Created task "${title}"`);
      }

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
        `/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Completed task "${task.title}"`);
      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const task = tasks.find((task) => task.id === taskId);
      await api.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`Deleted task "${task.title}"`);
      fetchTasks();
    } catch (error) {
      console.log(error.response);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);

    setEditTitle(task.title);
    setEditDescription(task.description || "");

    setEditAssignedTo(
      task.assigned_to
        ? task.assigned_to.id
        : ""
    );
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const oldTask = tasks.find((task) => task.id === editingTaskId);

  const oldAssignedId = oldTask?.assigned_to?.id;

  const member = members.find(
    (member) =>
      member.id === Number(editAssignedTo)
  );
      await api.put(
        `/tasks/${editingTaskId}`,
        {
          title: editTitle,
          description: editDescription,
          assigned_to: editAssignedTo || null,
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
      setEditAssignedTo("");

      if (oldAssignedId !== Number(editAssignedTo)) {
        if (member) {
        toast.success(`Reassigned "${editTitle}" to ${member.username}`);
        } else {
          toast.success(`Unassigned "${editTitle}"`);
        }
      } else {
        toast.success(`Updated task "${editTitle}"`);
      }

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||

      (task.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||

      (task.assigned_to?.username || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (filter === "pending") {
      return task.status === "pending";
    }

    if (filter === "completed") {
      return task.status === "completed";
    }

    if (filter === "mine") {
      return (
        task.assigned_to &&
        task.assigned_to.username === currentUsername
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <HiveHeader
        hive={hive}
        taskCount={tasks.length}
        memberCount={members.length}
        completedCount={completedCount}
        pendingCount={pendingCount}
      />

      {/* Create Task + Members */}
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <TaskForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            assignedTo={assignedTo}
            setAssignedTo={setAssignedTo}
            members={members}
            handleCreateTask={handleCreateTask}
          />
        </div>

        <MemberSection hiveId={id} />
      </div>

      {/* Tasks */}
      <div className="mt-8">
        <TaskSection
          tasks={filteredTasks}
          filter={filter}
          setFilter={setFilter}
          members={members}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
          startEditing={startEditing}
          editingTaskId={editingTaskId}
          editTitle={editTitle}
          editDescription={editDescription}
          editAssignedTo={editAssignedTo}
          setEditTitle={setEditTitle}
          setEditDescription={setEditDescription}
          setEditAssignedTo={setEditAssignedTo}
          handleUpdateTask={handleUpdateTask}
          setEditingTaskId={setEditingTaskId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}

export default Hive;