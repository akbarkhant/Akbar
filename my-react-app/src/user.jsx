 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";

const User = () => {
  const [userStats, setUserStats] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // 🔒 Protect Route
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) navigate("/login");
  }, [navigate]);

  // 📊 Load users and note counts
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const stats = users.map((user) => {
      const noteKey = `notes_${user.email}`;
      const notes = JSON.parse(localStorage.getItem(noteKey)) || [];
      return {
        username: user.username,
        email: user.email,
        notesCount: notes.length,
      };
    });
    setUserStats(stats);
  }, []);

  return (
    <div className="userdata-wrapper">
      {/* 🔽 Toggle Menu */}
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

      <h2>User Notes Summary</h2>
      {userStats.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "20px" }}>
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Email</th>
              <th>Total Notes</th>
            </tr>
          </thead>
          <tbody>
            {userStats.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.notesCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;
