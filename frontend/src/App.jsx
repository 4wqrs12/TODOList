import { useState } from "react";
import GroupCreate from "./components/GroupCreate";
import GroupsBox from "./components/GroupsBox";

function App() {
  return (
    <div>
      <GroupCreate />
      <GroupsBox />
    </div>
  );
}

export default App;
