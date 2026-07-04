function TaskCard({
  task,
  editingTaskId,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
  handleCompleteTask,
  handleDeleteTask,
  handleUpdateTask,
  startEditing,
  setEditingTaskId,
}) {
  return (
    <div>
      {editingTaskId === task.id ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <br />
          <br />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <br />
          <br />

          <button onClick={handleUpdateTask}>
            Save
          </button>

          <button
            onClick={() => setEditingTaskId(null)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <button
            onClick={() => handleCompleteTask(task.id)}
          >
            Complete
          </button>

          <button
            onClick={() => startEditing(task)}
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>
        </>
      )}

      <hr />
    </div>
  );
}

export default TaskCard;