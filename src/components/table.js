import React, { useEffect, useState } from "react";
import { getUsers } from "../firebase/firebaseDB";
import 'bootstrap-icons/font/bootstrap-icons.css';

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "monospace, Arial, sans-serif",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "1rem",
    margin: "2rem auto",
    maxWidth: "90vw",
    overflowX: "auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  refreshButton: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.75rem 1.5rem",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "1rem",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #ddd",
    verticalAlign: "middle",
  },
  image: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  noData: {
    textAlign: "center",
    padding: "1rem",
    fontStyle: "italic",
    color: "#777",
  },
  /* Card styles for mobile */
  card: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: "1rem",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: "1rem" },
  cardImg: { width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" },
  cardBody: { marginTop: "0.5rem" },
  cardTitle: { fontWeight: "bold", fontSize: "1.1rem", color: "#2e7d32" },
  cardSub: { color: "#555", fontSize: "0.9rem" },
};

export const Table = () => {
  const [users, setUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchAllUsers();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAllUsers = async () => {
    try {
      const all = await getUsers();
      setUsers(all);
    } catch (err) {
      console.error("Error loading users:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 Members Summary</h1>

      <div style={{ textAlign: "center" }}>
        <button style={styles.refreshButton} onClick={fetchAllUsers}>
          <i className="bi bi-arrow-repeat"></i> Refresh
        </button>
      </div>

      {/* Desktop Table */}
      {!isMobile && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Avatar</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Schedule</th>
              <th style={styles.th}>Present</th>
              <th style={styles.th}>Last Check-in</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.noData}>No users found.</td>
              </tr>
            ) : (
              users.map((u) => {
                const checkins = Array.isArray(u.checkinDates) ? u.checkinDates : [];
                const lastCheckin = checkins[checkins.length - 1] || "—";

                return (
                  <tr key={u.id}>
                    <td style={styles.td}>
                      <img src={u.profile_picture} alt={u.username} style={styles.image} />
                    </td>
                    <td style={styles.td}>{u.username}</td>
                    <td style={styles.td}>{u.email || "—"}</td>
                    <td style={styles.td}>
                      {Array.isArray(u.schedule) && u.schedule.length > 0
                        ? u.schedule.join(", ")
                        : "—"}
                    </td>
                    <td style={styles.td}>{u.present || 0}</td>
                    <td style={styles.td}>{lastCheckin}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <div>
          {users.length === 0 ? (
            <div style={styles.noData}>No users found.</div>
          ) : (
            users.map((u) => {
              const checkins = Array.isArray(u.checkinDates) ? u.checkinDates : [];
              const lastCheckin = checkins[checkins.length - 1] || "—";

              return (
                <div key={u.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <img src={u.profile_picture} alt={u.username} style={styles.cardImg} />
                    <div>
                      <div style={styles.cardTitle}>{u.username}</div>
                      <div style={styles.cardSub}>{u.email || "—"}</div>
                    </div>
                  </div>
                  <div style={styles.cardBody}>
                    <p><strong>Schedule:</strong> {u.schedule?.join(", ") || "—"}</p>
                    <p><strong>Present:</strong> {u.present || 0}</p>
                    <p><strong>Last Check-in:</strong> {lastCheckin}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button style={{ ...styles.refreshButton, marginTop: "1rem" }} >
            <a href="#/checkin" style={{ textDecoration: "none", color: "white" }}>Checkin Page</a>
        </button>
      </div>
    </div>
  );
};
