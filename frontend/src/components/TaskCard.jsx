function TaskCard({
  task,
  members,
  editingTaskId,
  editTitle,
  editDescription,
  editAssignedTo,
  setEditAssignedTo,
  setEditTitle,
  setEditDescription,
  handleCompleteTask,
  handleDeleteTask,
  handleUpdateTask,
  startEditing,
  setEditingTaskId,
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-violet-500 hover:shadow-violet-500/10 transition-all">
      {editingTaskId === task.id ? (
        <>
          <h3 className="text-xl font-bold mb-6">
            Edit Task
          </h3>

          <label className="block text-sm text-slate-400 mb-2">
            Task Title
          </label>

          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
          />

          <label className="block text-sm text-slate-400 mb-2">
            Description
          </label>

          <textarea
            rows={4}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6"
          />

          <label className="block text-sm text-slate-400 mb-2">
            Assign To
          </label>

          <select
            value={editAssignedTo}
            onChange={(e) => setEditAssignedTo(e.target.value)}
            className="w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6"
          >
            <option value="">
              Unassigned
            </option>

            {members.map((member) => (
              <option
                key={member.id}
                value={member.id}
              >
                {member.username} ({member.role})
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              onClick={handleUpdateTask}
              className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Save
            </button>

            <button
              onClick={() => setEditingTaskId(null)}
              className="bg-slate-600 hover:bg-slate-500 px-5 py-2 rounded-lg font-semibold transition"
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
                className={`ml-2 font-semibold ${
                  task.status === "completed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {task.status}
              </span>
            </div>

            <div>
              <span className="text-slate-400">
                Assigned to:
              </span>

              <span className="ml-2 font-semibold text-violet-400">
                {task.assigned_to
                  ? task.assigned_to.username
                  : "Unassigned"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {task.status !== "completed" && (
              <button
                onClick={() => handleCompleteTask(task.id)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
              >
                ✓ Complete
              </button>
            )}

            <button
              onClick={() => startEditing(task)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;