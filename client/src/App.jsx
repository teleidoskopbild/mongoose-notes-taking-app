import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const API_LINK = import.meta.env.VITE_API_LINK;

  async function fetchUsers() {
    const response = await fetch(`${API_LINK}/users`);
    if (!response.ok) {
      console.warn("Response is not OK!");
    }
    const data = await response.json();
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleUserOnClick() {
    if (!title || !description) {
      alert("Title AND Description are required!");
      return;
    }
    const response = await fetch(`${API_LINK}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
      }),
    });
    if (!response.ok) {
      console.warn("Response is not OK!");
    }
    setTitle("");
    setdescription("");
    fetchUsers();
    console.debug("Good!");
  }

  // delete the user

  async function handleDeleteUser(userId) {
    const response = await fetch(`${API_LINK}/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.warn("Failed to delete user");
      return;
    }
    fetchUsers(); // refresh the user list after deletion
    console.debug("User deleted successfully");
  }

  return (
    <div>
      <div className="add-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <button className="button-class" onClick={handleUserOnClick}>
          Add Note
        </button>
      </div>
      <hr></hr>
      <div className="user-list">
        {users.map(({ _id, title, description }) => (
          <div className="user" key={_id}>
            <p>
              <strong>{title}</strong>
              {<br />} {description}
            </p>
            <button
              className="button-class"
              onClick={() => handleDeleteUser(_id)}
            >
              Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
