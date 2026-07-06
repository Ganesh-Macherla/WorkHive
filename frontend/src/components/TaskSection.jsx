function TaskSection({
  tasks,
  handleCompleteTask,
  handleDeleteTask,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Tasks
        </h2>

        <p className="text-slate-400 mt-2">
          Team tasks inside this hive.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No tasks yet.
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

              <p className="text-slate-400 mt-2">
                {task.description}
              </p>

              <p className="mt-5">
                Status:

                <span
                  className={`ml-2 font-semibold ${
                    task.status === "completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              <div className="flex gap-3 mt-6">

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

export default TaskSection;