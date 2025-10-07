import React, { useEffect, useState } from "react";
import { addUserWithImage, getUsers, fileToBase64 } from "../firebase/firebaseDB";
import { Member } from "./member";
import 'bootstrap-icons/font/bootstrap-icons.css';

const styleSheet = {
  checkinPage: { 
    position: "relative",
    minHeight: "100vh",
    paddingBottom: "2rem",
    overflow: "hidden",
  },
  logoImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
    opacity: 0.2, // make logo subtle
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  title: { fontSize: "3rem", fontWeight: "bold", marginBottom: "1.5rem", color: "green" },
  containerText: { padding: "2rem", fontFamily: "monospace, Arial, sans-serif", textAlign: "center", backgroundColor: "transparent" },
  addButton: { padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "1.5rem", backgroundColor: "#4CAF50", border: "none", color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1rem", fontWeight: "bold" },
  userList: { listStyle: "none", padding: 0, display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", backgroundColor: "transparent" },
  userItem: { display: "flex", alignItems: "center", marginBottom: "1.5vh", flexDirection: "column", backgroundColor: "transparent", fontWeight: "bold", color: "#333", fontSize: "0.5rem" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 },
  modalContent: { backgroundColor: "rgba(255,255,255,0.95)", padding: "2rem", borderRadius: "1rem", minWidth: "300px", maxWidth: "40vw" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.75rem", fontSize: "1rem" },
  submitButton: { padding: "0.75rem 1.5rem", cursor: "pointer", marginRight: "1rem", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "0.5rem" },
  cancelButton: { padding: "0.75rem 1.5rem", cursor: "pointer", marginLeft: "1rem", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "0.5rem" },
};

const daysOfWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const Checkin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({ username: "", email: "", file: null, selectedDays: [] });
  const [showAll, setShowAll] = useState(false);

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
    if (!form.username || !form.email || !form.file) { 
      alert("Fill in all fields."); 
      return; 
    }
    try {
      const newUserId = await addUserWithImage(form);

      const newUser = {
        id: newUserId,
        username: form.username,
        email: form.email,
        schedule: form.selectedDays,
        profile_picture: await fileToBase64(form.file, 100, 100),
        present: 0,
        checkinDates: [],
      };

      setUsers(prev => [...prev, newUser]); // add to state immediately

      setForm({ username: "", email: "", file: null, selectedDays: [] });
      setShowModal(false);
    } catch (err) { 
      console.error("Error adding user:", err); 
      alert("Error adding user"); 
    }
  };

  // ---------------- Smart Search Filter ----------------
  const filterUsers = (users, query) => {
    if (!query) return users;
    const lowerQuery = query.toLowerCase();
    const exactMatches = [];
    const partialMatches = [];
    users.forEach(user => {
      const username = user.username.toLowerCase();
      if (username === lowerQuery) exactMatches.push(user);
      else if (username.includes(lowerQuery)) partialMatches.push(user);
    });
    return [...exactMatches, ...partialMatches];
  };

  const displayedUsers = filterUsers(
    users.filter(u => showAll || (Array.isArray(u.schedule) && u.schedule.includes(today))),
    searchQuery
  );

  // ---------------- JSX ----------------
  return (
    <div style={styleSheet.checkinPage}>
      {/* Logo behind everything */}
      <img
      src='/logo.png' // Replace with your logo path
      alt="logo"
      class="logo"
      style={styleSheet.logoImage}
    />

    {/* All content on top */}
    <div style={styleSheet.content}>
      <div style={styleSheet.containerText}>
        <h1 style={styleSheet.title}>CHECK IN - {today}</h1>
      </div>

      <div style={{ textAlign: "center", marginBottom: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        {!searchBar && (
          <div style={{ display: "flex", gap: "1rem" }}>
            {/* Add User Button */}
            <button style={styleSheet.addButton} onClick={() => setShowModal(true)}>
              <i className="bi bi-person-fill fs-5"></i> Add
            </button>

            {/* Show All / Show Today Button */}
            <button style={{ ...styleSheet.addButton, backgroundColor: "#2196F3" }} onClick={() => setShowAll(prev => !prev)}>
              <i className="bi bi-calendar-check fs-5"></i> {showAll ? "Show Today" : "Show All"}
            </button>

            {/* Search Button */}
            <button style={{ ...styleSheet.addButton, backgroundColor: "#f39c12" }} onClick={() => setSearchBar(true)}>
              <i className="bi bi-search fs-5"></i> Search
            </button>
          </div>
        )}
        {searchBar && (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <input 
              type="text"
              placeholder="Search by username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "0.5rem", border: "1px solid #ccc" }}
            />
            <button 
              style={{...styleSheet.addButton, backgroundColor: "#e67e22"}}
              onClick={() => { setSearchBar(false); setSearchQuery(""); }}
            >
              Close
            </button>
          </div>
        )}
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

      <div style={{ textAlign: "center", padding: "0 1rem" }}>
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
                onUpdate={(id, updatedData) => {
                  setUsers(prevUsers =>
                    prevUsers.map(user => user.id === id ? { ...user, ...updatedData } : user)
                  );
                }}
                onDelete={(id) => {
                  setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                }}
              />
              <p>{u.username}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
};
