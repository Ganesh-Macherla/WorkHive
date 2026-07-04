function TaskForm({
  title,
  description,
  setTitle,
  setDescription,
  handleCreateTask,
}) {
  return (
    <>
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
    </>
  );
}

export default TaskForm;