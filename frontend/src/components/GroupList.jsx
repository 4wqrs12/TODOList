function GroupList({ groupName, tasks }) {
  return (
    <div>
      <h1>{groupName}</h1>
      {tasks.length === 0 ? (
        <p>No tasks here</p>
      ) : (
        <ul>
          {tasks.map((v, i) => (
            <div>
              <button key={i}>{v}</button>
              <button>🗑️</button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroupList;
