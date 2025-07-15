import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editUserData, setEditUserData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  // 🛡️ Protect route - only allow logged in users
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [navigate]);

  // Load users
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Delete a user
  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Edit a user
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditUserData(users[index]);
  };

  const handleEditChange = (e) => {
    setEditUserData({ ...editUserData, [e.target.name]: e.target.value });
  };

  const applyChanges = () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex] = editUserData;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingIndex(null);
  };

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      {/* Toggle Dropdown Menu */}
      <div className="dropdown-container">
        <button className="toggle-btn" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>
        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={() => navigate("/dash")}>Dashboard</button>
            <button onClick={() => navigate("/data")}>Notes</button>
            <button onClick={() => navigate("/user")}>Data</button>
          </div>
        )}
      </div>

      <h2>User Dashboard</h2>
      {users.length === 0 ? (
        <p>No users have signed up yet.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "20px" }}>
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => startEditing(index)} className="edit-btn">Edit</button>{" "}
                  <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Inline Edit Box */}
      {editingIndex !== null && (
        <div className="edit-popup">
          <h3>Edit User</h3>
          <label>Username:</label>
          <input
            name="username"
            value={editUserData.username}
            onChange={handleEditChange}
          />
          <label>Email:</label>
          <input
            name="email"
            value={editUserData.email}
            onChange={handleEditChange}
          />
          <label>Password:</label>
          <input
            name="password"
            value={editUserData.password}
            onChange={handleEditChange}
          />
          <label>Phone:</label>
          <input
            name="phone"
            value={editUserData.phone}
            onChange={handleEditChange}
          />
          <button className="apply-btn" onClick={applyChanges}>Change</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

