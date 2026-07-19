import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import HiveHeader from "../components/HiveHeader";
import TaskForm from "../components/TaskForm";
import TaskSection from "../components/TaskSection";
import MemberSection from "../components/MemberSection";
import ActivityFeed from "../components/ActivityFeed";

function Hive() {
  const { id } = useParams();

  const [hive, setHive] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const currentUsername = localStorage.getItem("username");

  const [members, setMembers] = useState([]);

  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAssignedTo, setEditAssignedTo] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

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

  const fetchActivities =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await api.get(
            `/hives/${id}/activities`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setActivities(
          response.data
        );

      } catch (error) {

        console.log(
          error.response
        );

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
    fetchActivities();
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
          due_date: dueDate || null,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const member = members.find(
        (member) =>
          member.id === Number(assignedTo)
      );

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setDueDate("");
      setPriority("medium");

      if (member) {
        toast.success(
          dueDate
            ? `Assigned "${title}" to ${member.username} • Due ${dueDate}`
            : `Assigned "${title}" to ${member.username}`
        );
      } else {
        toast.success(
          dueDate
            ? `Created "${title}" • Due ${dueDate}`
            : `Created task "${title}"`
        );
      }

      fetchTasks();
      fetchActivities();
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
        `/tasks/${taskId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Completed task "${task.title}"`
      );

      fetchTasks();
      fetchActivities();
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
        `/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Deleted task "${task.title}"`
      );

      fetchTasks();
      fetchActivities();
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

    setEditAssignedTo(
      task.assigned_to
        ? task.assigned_to.id
        : ""
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

      const oldAssignedId =
        oldTask?.assigned_to?.id || null;

      const newAssignedId =
        editAssignedTo
          ? Number(editAssignedTo)
          : null;

      const member = members.find(
        (member) =>
          member.id === newAssignedId
      );

      await api.put(
        `/tasks/${editingTaskId}`,
        {
          title: editTitle,
          description: editDescription,
          assigned_to:
            editAssignedTo || null,
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
      setEditAssignedTo("");
      setEditDueDate("");
      setEditPriority("medium");

      const oldDueDate = oldTask?.due_date;

      if (
        oldAssignedId !==
        newAssignedId
      ) {
        if (member) {
          toast.success(
            `Reassigned "${editTitle}" to ${member.username}`
          );
        } else {
          toast.success(
            `Unassigned "${editTitle}"`
          );
        }
      } else if (oldDueDate !== editDueDate) {
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
          `Updated task "${editTitle}"`
        );
      }
      fetchTasks();
      fetchActivities();
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
          ) ||
        (task.assigned_to?.username || "")
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
        return (
          task.status === "pending"
        );
      }

      if (filter === "completed") {
        return (
          task.status === "completed"
        );
      }

      if (filter === "mine") {
        return (
          task.assigned_to &&
          task.assigned_to
            .username ===
            currentUsername
        );
      }

      if (filter === "overdue") {
        return (
          task.status !==
            "completed" &&
          taskDate &&
          taskDate < today
        );
      }

      if (filter === "today") {
        return (
          task.status !==
            "completed" &&
          taskDate &&
          taskDate.getTime() ===
            today.getTime()
        );
      }

      if (filter === "tomorrow") {
        return (
          task.status !==
            "completed" &&
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
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <HiveHeader
        hive={hive}
        taskCount={tasks.length}
        memberCount={members.length}
        completedCount={completedCount}
        pendingCount={pendingCount}
      />

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <TaskForm
            title={title}
            description={description}
            dueDate={dueDate}
            setDueDate={setDueDate}
            setTitle={setTitle}
            setDescription={setDescription}
            assignedTo={assignedTo}
            setAssignedTo={setAssignedTo}
            members={members}
            handleCreateTask={handleCreateTask}
            priority={priority}
            setPriority={setPriority}
          />
        </div>

        <MemberSection hiveId={id} />
      </div>

      <div className="mt-8">
        <TaskSection
          tasks={filteredTasks}
          filter={filter}
          setFilter={setFilter}
          members={members}
          editDueDate={editDueDate}
          setEditDueDate={setEditDueDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
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
          editPriority={editPriority}
          setEditPriority={setEditPriority}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="mt-8">
          <ActivityFeed
            activities={activities}
              activities={activities.slice(0, 6)}
              hiveId={id}
              showViewAll={
                activities.length > 6
              }
          />
        </div>
      </div>
    </div>
  );
}

export default Hive;