import { useState, useEffect } from "react";
import GroupList from "./GroupList";

function GroupCreate() {
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [groupItem, setGroupItem] = useState("");
  const [groupTasks, setGroupTasks] = useState([]);

  const filteredData = groups.filter((i) => {
    return i.groupName.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
    if (data.message === "Group already exists") {
      setMessage("Group already exists!");
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
    fetchGroups();
  }

  function handleChange(e) {
    setGroupName(e.target.value);
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  async function handleGroupItem(e) {
    setGroupItem(e.target.textContent);
    const res = await fetch(
      `http://localhost:5000/api/get-task?q=${encodeURIComponent(groupItem)}`
    );
    const data = await res.json();
    if (data.success) {
      setGroupTasks(data.data);
    }
  }

  useEffect(() => {
    handleGroupItem();
  }, []);

  return (
    <div>
      <div className="flex justify-between m-5">
        <div>
          <input
            type="text"
            value={groupName}
            onChange={handleChange}
            className="mr-3 create-group-input"
            placeholder="Enter a group name..."
          />
          <button onClick={addGroup}>+</button>
        </div>
        {message && <p>{message}</p>}
        <input
          type="text"
          value={searchTerm}
          className="create-group-input"
          onChange={handleSearch}
          placeholder="Search..."
        ></input>
      </div>
      <div className="flex flex-col items-center justify-center gap-[15px] pt-6">
        {filteredData.map((item, index) => (
          <button
            onClick={handleGroupItem}
            className="italic font-semibold text-blue-400 bg-neutral-200 px-10 rounded-lg shadow-md hover:bg-neutral-500 hover:text-blue-100 hover:scale-105 transition duration-50 cursor-pointer"
            key={index}
          >
            {item.groupName}
          </button>
        ))}
        <GroupList groupName={groupItem} tasks={groupTasks} />
      </div>
    </div>
  );
}

export default GroupCreate;
