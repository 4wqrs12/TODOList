import { useState, useEffect } from "react";

function GroupCreate() {
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);

  async function fetchGroups() {
    const res = await fetch("http://localhost:5000/api/get-groups");
    const data = await res.json();
    setGroups(data.data);
    console.log(data.data);
  }

  useEffect(() => {
    fetchGroups();
  }, []);

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
    setTimeout(() => {
      setMessage("");
    }, 3000);
    fetchGroups();
  }

  function handleChange(e) {
    setGroupName(e.target.value);
  }
  const filterGroup = groups.filter((i) =>
    i.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleSearch(e) {
    setSearchTerm(e.target.value);
    filterGroup;
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
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      ></input>
      <div className="pt-6">
        {groups.map((v, i) => (
          <p key={i}>{v.groupName}</p>
        ))}
      </div>
    </div>
  );
}

export default GroupCreate;
