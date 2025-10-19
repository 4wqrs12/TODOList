import { useState } from "react";

function Group() {
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  async function addGroup() {
    const res = await fetch("http://localhost:5000/api/add-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupName: groupName, username: username }),
    });
    const data = await res.json();
    setMessage(data.message);
  }

  function handleChange(e) {
    setGroupName(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={groupName}
        onChange={handleChange}
        placeholder="Enter a group name..."
      />
      <button onClick={addGroup}>+</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Group;
