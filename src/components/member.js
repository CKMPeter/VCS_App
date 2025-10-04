import React, { useEffect, useState } from "react";
import { incrementPresent, updateUser, deleteUser } from "../firebase/firebaseDB"; // ✅ import deleteUser

const styleSheet = {
  memberDisplay: {
    position: "relative",
    minHeight: "200px",
    minWidth: "150px",
    height: "20vh",
    width: "15vw",
    borderRadius: "1rem",
    overflow: "hidden",
    cursor: "pointer"
  },
  avatar: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "1rem",
    transition: "0.3s"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    borderRadius: "1rem",
    pointerEvents: "none",
    transition: "0.3s"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "1rem",
    minWidth: "320px",
    maxWidth: "40vw"
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    marginBottom: "1rem",
    width: "inherit"
  },
  button: {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export function Member({ id, avatar, username, lastCheckinDate, showAll, schedule = [], onDelete }) {
  const [isGreen, setIsGreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    username: username || "",
    file: null,
    selectedDays: schedule || []
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setIsGreen(lastCheckinDate === today);
  }, [lastCheckinDate]);

  const handleClick = async () => {
    if (showAll) {
      setShowModal(true);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (lastCheckinDate === today || isGreen) return;

    setIsGreen(true);
    try {
      await incrementPresent(id);
    } catch (err) {
      console.error("Error incrementing present:", err);
      setIsGreen(false);
    }
  };

  const handleDayToggle = (day) => {
    setForm(prev => {
      const selected = prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day];
      return { ...prev, selectedDays: selected };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updateData = { username: form.username };

      // Only include file if user selected one
      if (form.file) updateData.file = form.file;

      // Always include schedule array, even if empty
      updateData.schedule = form.selectedDays && form.selectedDays.length > 0
        ? form.selectedDays
        : [];

      await updateUser(id, updateData);

      alert("User updated!");
      setShowModal(false);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user");
    }
  };


  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${username}?`)) return;

    try {
      await deleteUser(id); // ✅ delete from Firebase
      alert("User deleted!");
      setShowModal(false);
      if (onDelete) onDelete(id); // ✅ let parent re-fetch or remove from UI
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") setForm(prev => ({ ...prev, file: files[0] }));
    else setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div
        className="member-display"
        style={styleSheet.memberDisplay}
        onClick={handleClick}
      >
        <img src={avatar} alt={username || "avatar"} style={styleSheet.avatar} />
        {!showAll && (
          <div
            style={{
              ...styleSheet.overlay,
              backgroundColor: isGreen
                ? "rgba(0,255,0,0.4)"
                : "rgba(255,0,0,0.4)"
            }}
          />
        )}
      </div>

      {showModal && (
        <div style={styleSheet.modalOverlay} onClick={() => setShowModal(false)}>
          <div
            style={styleSheet.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: "1rem" }}>Update Member</h2>
            <form
              onSubmit={handleUpdate}
              style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem", overflowY: "auto", maxHeight: "80vh" }}
            >
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                style={styleSheet.input}
              />
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                style={styleSheet.input}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
                <h4>Schedule</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {daysOfWeek.map(day => (
                    <label key={day} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <input
                        type="checkbox"
                        checked={form.selectedDays.includes(day)}
                        onChange={() => handleDayToggle(day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ ...styleSheet.button, backgroundColor: "gray", color: "white" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ ...styleSheet.button, backgroundColor: "#4CAF50", color: "white" }}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  style={{ ...styleSheet.button, backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
