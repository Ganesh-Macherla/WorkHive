function TaskCard({
  task,
  members,
  editingTaskId,
  editTitle,
  editDescription,
  editAssignedTo,
  editDueDate,
  setEditAssignedTo,
  setEditTitle,
  setEditDescription,
  setEditDueDate,
  handleCompleteTask,
  handleDeleteTask,
  handleUpdateTask,
  startEditing,
  setEditingTaskId,
  editPriority,
  setEditPriority,
}) {

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
            onChange={(e) =>
              setEditTitle(
                e.target.value
              )
            }
            className="w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
          />

          <label className="block text-sm text-slate-400 mb-2">
            Description
          </label>

          <textarea
            rows={4}
            value={editDescription}
            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }
            className="w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
          />

          <label className="block text-sm text-slate-400 mb-2">
            Assign To
          </label>

          <select
            value={editAssignedTo}
            onChange={(e) =>
              setEditAssignedTo(
                e.target.value
              )
            }
            className="w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
          >
            <option value="">
              Unassigned
            </option>

            {members.map(
              (member) => (
                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.username} (
                  {member.role})
                </option>
              )
            )}
          </select>

          <label className="block text-sm text-slate-400 mb-2">
            Due Date
          </label>

          <input
            type="date"
            value={editDueDate}
            onChange={(e) =>
              setEditDueDate(
                e.target.value
              )
            }
            className="w-full rounded-xl bg-slate-700 border border-slate-600 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6"
          />

          <div className="flex gap-3">

            <button
              onClick={
                handleUpdateTask
              }
              className="bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Save
            </button>

            <button
              onClick={() =>
                setEditingTaskId(
                  null
                )
              }
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
            {task.description ||
              "No description provided."}
          </p>

          <div className="mt-5 space-y-2">

            <div>

              <span className="text-slate-400">
                Status:
              </span>

              <span
                className={`ml-2 font-semibold ${
                  displayStatus ===
                  "completed"
                    ? "text-green-400"
                    : displayStatus ===
                      "overdue"
                    ? "text-red-400"
                    : displayStatus ===
                      "due today"
                    ? "text-orange-400"
                    : displayStatus ===
                      "due tomorrow"
                    ? "text-yellow-400"
                    : "text-yellow-400"
                }`}
              >
                {displayStatus}
              </span>

            </div>

            <div>

              <span className="text-slate-400">
                Assigned to:
              </span>

              <span className="ml-2 font-semibold text-violet-400">
                {task.assigned_to
                  ? task
                      .assigned_to
                      .username
                  : "Unassigned"}
              </span>

            </div>

            {formattedDueDate && (

              <div>

                <span className="text-slate-400">
                  Due:
                </span>

                <span
                  className={`ml-2 font-semibold ${dueDateColor}`}
                >
                  {formattedDueDate}
                </span>

              </div>

            )}

          </div>

          <div className="flex flex-wrap gap-3 mt-6">

            {task.status !==
              "completed" && (

              <button
                onClick={() =>
                  handleCompleteTask(
                    task.id
                  )
                }
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition"
              >
                ✓ Complete
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
                handleDeleteTask(
                  task.id
                )
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
}

export default TaskCard;