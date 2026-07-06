function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  handleCreateTask,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Create Task
        </h2>

        <p className="text-slate-400 mt-2">
          Add a new task to this hive.
        </p>
      </div>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-5"
      />

      <textarea
        rows={5}
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6"
      />

      <button
        onClick={handleCreateTask}
        className="w-full bg-violet-600 hover:bg-violet-700 py-4 rounded-xl font-semibold transition"
      >
        + Create Task
      </button>

    </div>
  );
}

export default TaskForm;