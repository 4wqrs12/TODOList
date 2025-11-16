import { useState } from "react";

function Connect() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div>
      <form>
        <input type="text" value={firstName}></input>
      </form>
    </div>
  );
}

export default Connect;
