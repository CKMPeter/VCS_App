import React, { useEffect, useState } from "react";
import { addUserWithImage, getUsers } from "../firebase/firebaseDB";
import { Member } from "./member";

const styleSheet = {
  title: { fontSize: "3rem", fontWeight: "bold", marginBottom: "1.5rem", color: "green" },
  containerText: { padding: "2rem", fontFamily: "monospace, Arial, sans-serif", textAlign: "center" },
  addButton: { padding: "0.5rem 2rem", cursor: "pointer", borderRadius: "1.5rem", backgroundColor: "#4CAF50", border: "none" },
  userList: { listStyle: "none", padding: 0, display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" },
  userItem: { display: "flex", alignItems: "center", marginBottom: "1.5vh" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 },
  modalContent: { backgroundColor: "#fff", padding: "2rem", borderRadius: "1rem", minWidth: "300px", maxWidth: "40vw" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.75rem", fontSize: "1rem" },
  submitButton: { padding: "0.75rem 1.5rem", cursor: "pointer", marginRight: "1rem", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "0.5rem" },
  cancelButton: { padding: "0.75rem 1.5rem", cursor: "pointer", marginLeft: "1rem", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "0.5rem" }
};

const daysOfWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const Checkin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", file: null, selectedDays: [] });
  const [showAll, setShowAll] = useState(false); // <-- New state

  const today = daysOfWeek[new Date().getDay()];
  useEffect(() => { fetchUsers(); }, [today]);

  const fetchUsers = async () => {
    try {
      const allUsers = await getUsers();
      setUsers(allUsers);
    } catch (err) { console.error("Error fetching users:", err); }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") setForm(prev => ({ ...prev, file: files[0] }));
    else setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day) => {
    setForm(prev => {
      const { selectedDays } = prev;
      if (selectedDays.includes(day)) return { ...prev, selectedDays: selectedDays.filter(d => d !== day) };
      else return { ...prev, selectedDays: [...selectedDays, day] };
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.file) { alert("Fill in all fields."); return; }
    try {
      await addUserWithImage(form);
      setForm({ username: "", email: "", file: null, selectedDays: [] });
      setShowModal(false);
      fetchUsers();
    } catch (err) { console.error("Error adding user:", err); alert("Error adding user"); }
  };

  // Decide which users to render
  const displayedUsers = showAll 
    ? users 
    : users.filter(u => Array.isArray(u.schedule) && u.schedule.includes(today));

  return (
    <div>
      <div style={styleSheet.containerText}>
        <h1 style={styleSheet.title}>CHECK IN - {today}</h1>
      </div>

      <div style={{ textAlign: "center", marginBottom: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button style={styleSheet.addButton} onClick={() => setShowModal(true)}>
          <p style={{color:"white", fontSize:"1rem", fontWeight:"bold"}}>Add</p>
        </button>
        <button style={{...styleSheet.addButton, backgroundColor: "#2196F3"}} onClick={() => setShowAll(prev => !prev)}>
          <p style={{color:"white", fontSize:"1rem", fontWeight:"bold"}}>{showAll ? "Show Today" : "Show All"}</p>
        </button>
      </div>

      {showModal && (
        <div style={styleSheet.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styleSheet.modalContent} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleAdd} style={styleSheet.form}>
              <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} style={styleSheet.input}/>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styleSheet.input}/>
              <input type="file" name="file" accept="image/*" onChange={handleChange} style={styleSheet.input}/>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                {daysOfWeek.map(day => (
                  <label key={day} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <input type="checkbox" checked={form.selectedDays.includes(day)} onChange={() => handleDayChange(day)}/> {day}
                  </label>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-start", gap: "1rem" }}>
                <button type="submit" style={styleSheet.submitButton}>Submit</button>
                <button type="button" onClick={() => setShowModal(false)} style={styleSheet.cancelButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "0 2rem" }}>
        <ul style={styleSheet.userList}>
          {displayedUsers.map(u => (
            <li key={u.id} style={styleSheet.userItem}>
              <Member
                avatar={u.profile_picture}
                username={u.username}
                id={u.id}
                lastCheckinDate={u.lastCheckinDate}
                showAll={showAll}
                schedule={u.schedule || []}  
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
