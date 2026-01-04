import { useState } from "react";
import Task from "./Task";

function GroupList({ groupName, tasks, showGroup }) {
  const [taskName, setTaskName] = useState("");

  function closeList() {
    showGroup(false);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1>{groupName}</h1>
        <button onClick={closeList} className="text-red-400 cursor-pointer">
          ❌
        </button>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks here</p>
      ) : (
        <ul>
          {tasks.map((v, i) => (
            <Task key={i} taskName={v} groupName={groupName} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroupList;
