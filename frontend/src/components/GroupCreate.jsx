import { useState, useEffect } from "react";

function GroupCreate() {
  const [groupName, setGroupName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);

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
      <div className="flex flex-col items-center justify-center gap-[15px] pt-6">
        {filteredData.map((item, index) => (
          <p
            className="italic font-semibold text-blue-400 bg-neutral-200 px-10 rounded-lg shadow-md hover:bg-neutral-500 hover:text-blue-100 hover:scale-105 transition duration-50 cursor-pointer"
            key={index}
          >
            {item.groupName}
          </p>
        ))}
      </div>
    </div>
  );
}

export default GroupCreate;
