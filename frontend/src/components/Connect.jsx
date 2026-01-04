import { useState } from "react";

function Connect() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });
    const data = await res.json();
    if (data.success === true) {
      setOutput("Message sent!");
      setEmail("");
      setLastName("");
      setFirstName("");
      setMessage("");
    } else {
      setOutput("An error occured!");
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <input
          type="text"
          placeholder="First Name"
          className="input-style"
          value={firstName}
          onChange={handleFirstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input-style"
          value={lastName}
          onChange={handleLastName}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-style"
          value={email}
          onChange={handleEmail}
        />
        <textarea
          type="text"
          placeholder="Message"
          className="input-style"
          value={message}
          onChange={handleMessage}
        ></textarea>

        <button
          type="submit"
          className="bg-violet-400 text-white cursor-pointer p-2 rounded-lg hover:bg-violet-500 transition duration-50"
        >
          Submit
        </button>
        <p>{output}</p>
      </form>
    </div>
  );
}

export default Connect;
