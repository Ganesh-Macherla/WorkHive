import TaskCard from "./TaskCard";

function TaskSection({
  tasks,
  members,
  filter,
  setFilter,
  dueDate,
  setDueDate,
  editDueDate,
  setEditDueDate,
  editPriority,
  setEditPriority,
  searchQuery,
  setSearchQuery,
  editingTaskId,
  editTitle,
  editDescription,
  editAssignedTo,
  setEditTitle,
  setEditDescription,
  setEditAssignedTo,
  handleCompleteTask,
  handleDeleteTask,
  handleUpdateTask,
  startEditing,
  setEditingTaskId,
}) {
  const filterLabels = {
    all: "All",
    pending: "Pending",
    completed: "Completed",
    mine: "Assigned To Me",
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

        <div>
          <h2 className="text-3xl font-bold">
            Team Tasks
          </h2>

          <p className="text-slate-400 mt-2">
            Manage work inside this hive.
          </p>
        </div>

        <div className="bg-slate-800 px-4 py-2 rounded-xl">
          <span className="text-slate-400">
            Showing
          </span>

          <span className="ml-2 font-bold text-violet-400">
            {tasks.length}
          </span>

          <span className="ml-2 text-slate-400">
            • {filterLabels[filter]}
          </span>
        </div>

      </div>

      <div className="relative mb-6">

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
          >
            ✕
          </button>
        )}

      </div>

      <div className="flex flex-wrap gap-3 mb-8">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-xl transition ${
            filter === "all"
              ? "bg-violet-600"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-xl transition ${
            filter === "pending"
              ? "bg-yellow-600"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-xl transition ${
            filter === "completed"
              ? "bg-green-600"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          Completed
        </button>

        <button
          onClick={() => setFilter("mine")}
          className={`px-4 py-2 rounded-xl transition ${
            filter === "mine"
              ? "bg-blue-600"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          Assigned To Me
        </button>

      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-16">

          <div className="text-5xl mb-4">
            📋
          </div>

          <h3 className="text-xl font-semibold mb-2">
            No matching tasks
          </h3>

          <p className="text-slate-400">
            Try changing the filter or search.
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              members={members}
              editDueDate={editDueDate}
              setEditDueDate={setEditDueDate}
              editingTaskId={editingTaskId}
              editTitle={editTitle}
              editDescription={editDescription}
              editAssignedTo={editAssignedTo}
              setEditTitle={setEditTitle}
              setEditDescription={setEditDescription}
              setEditAssignedTo={setEditAssignedTo}
              handleCompleteTask={handleCompleteTask}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
              startEditing={startEditing}
              setEditingTaskId={setEditingTaskId}
              editPriority={editPriority}
              setEditPriority={setEditPriority}
            />
          ))}

        </div>
      )}

    </div>
  );
}

export default TaskSection;