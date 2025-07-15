import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./note.css";

const Data = () => {
  const navigate = useNavigate();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [showMenu, setShowMenu] = useState(false); // for toggle menu

  // 🔐 Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      navigate("/login");
    } else {
      setUserEmail(user.email);
      const savedNotes = JSON.parse(localStorage.getItem(`notes_${user.email}`)) || [];
      setNotes(savedNotes);
    }
  }, [navigate]);

  // ➕ Add Note
  const handleAddNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) return alert("Please fill both fields");

    const newNote = {
      title: noteTitle,
      content: noteContent,
      time: new Date().toLocaleString(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${userEmail}`, JSON.stringify(updatedNotes));
    setNoteTitle("");
    setNoteContent("");
  };

  // ❌ Delete One
  const handleClearNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${userEmail}`, JSON.stringify(updatedNotes));
  };

  // ❌ Delete All
  const handleClearAll = () => {
    setNotes([]);
    localStorage.removeItem(`notes_${userEmail}`);
  };

  return (
    <div className="data-wrapper">
      {/* ☰ Toggle Dropdown */}
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

      <h2>Your Notes</h2>

      <div className="note-input">
        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
        {notes.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            Clear All Notes
          </button>
        )}
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note-card">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              <span className="timestamp">{note.time}</span>
              <button onClick={() => handleClearNote(index)} className="delete-note-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Data;

