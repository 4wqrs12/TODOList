function Task({ taskName, groupName }) {
  async function removeTask() {
    const res = await fetch("http://localhost:5000/api/remove-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, groupName }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <button>{taskName}</button>
      <button onClick={removeTask}>🗑️</button>
    </div>
  );
}

export default Task;
