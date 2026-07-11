import TaskCard from "./TaskCard";

function TaskSection({
  tasks,
  members,
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
  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">
      <div className="flex items-center justify-between mb-8">
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
            Total
          </span>

          <span className="ml-2 font-bold text-violet-400">
            {tasks.length}
          </span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">
            📋
          </div>

          <h3 className="text-xl font-semibold mb-2">
            No tasks yet
          </h3>

          <p className="text-slate-400">
            Create your first team task to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              members={members}
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskSection;