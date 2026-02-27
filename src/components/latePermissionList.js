import React, { useEffect, useState } from "react";

const styleSheet = {
  root: {
    fontFamily: "monospace, Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    width: "100%",
  },
  wrapper: {
    width: "100%",
    maxWidth: "60rem",
    padding: "0 0.5rem", // ✅ prevent edge overflow
    boxSizing: "border-box",
    },

  /* DESKTOP TABLE */
  tableContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "0.6rem",
    boxShadow: "0 0.25rem 0.75rem rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "0.75rem",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.85rem",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "0.06rem solid #eee",
    fontSize: "0.85rem",
    wordBreak: "break-word",
  },
  row: {
    transition: "background 0.2s ease",
    cursor: "pointer",
  },

  /* MOBILE CARD */
  card: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "0.8rem",
    boxShadow: "0 0.3rem 0.8rem rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    borderLeft: "5px solid #4CAF50",

    width: "100%",          // ✅ prevent overflow
    boxSizing: "border-box" // ✅ include padding in width
    },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    },
  name: {
    fontWeight: "700",
    fontSize: "1rem",
  },
  email: {
    fontSize: "0.8rem",
    color: "#777",
    wordBreak: "break-word",     // ✅ break long emails
    overflowWrap: "anywhere",    // ✅ modern fix
  },
  badge: {
    backgroundColor: "#f39c12",
    color: "white",
    padding: "0.25rem 0.6rem",
    borderRadius: "0.4rem",
    fontSize: "0.75rem",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  rowLine: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.85rem",
  },
  label: {
    color: "#555",
  },
  value: {
    fontWeight: "600",
  },

  empty: {
    padding: "1rem",
    textAlign: "center",
  },
};

export const LatePermissionList = ({ data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  function reformatDate(dateString) {
    const date = new Date(
      dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
    );
    return date.toLocaleDateString("en-GB");
  }

  const filteredData = data.filter(
    (item) => reformatDate(item.time) === reformatDate(today)
  );

  return (
    <div style={styleSheet.root}>
      <h2>Late Permission List</h2>

      <div style={styleSheet.wrapper}>
        {filteredData.length === 0 ? (
          <p style={styleSheet.empty}>
            No late permissions for today.
          </p>
        ) : isMobile ? (
          /* ✅ MOBILE VIEW */
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filteredData.map((item, index) => (
              <div key={index} style={styleSheet.card}>
                
                {/* Header */}
                <div style={styleSheet.cardHeader}>
                    <div style={{ minWidth: 0 }}>
                        <div style={styleSheet.name}>{item.name}</div>
                        <div style={styleSheet.email}>{item.email}</div>
                    </div>

                    <div style={styleSheet.badge}>
                        +{item.lateTime} min
                    </div>
                </div>
                {/* Info */}
                <div style={styleSheet.rowLine}>
                  <span style={styleSheet.label}>Date</span>
                  <span style={styleSheet.value}>
                    {reformatDate(item.time)}
                  </span>
                </div>

                <div style={styleSheet.rowLine}>
                  <span style={styleSheet.label}>Status</span>
                  <span style={{ ...styleSheet.value, color: "#e74c3c" }}>
                    Late
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ✅ DESKTOP VIEW */
          <div style={styleSheet.tableContainer}>
            <table style={styleSheet.table}>
              <thead>
                <tr>
                  <th style={styleSheet.th}>Name</th>
                  <th style={styleSheet.th}>Email</th>
                  <th style={styleSheet.th}>Time</th>
                  <th style={styleSheet.th}>Late Minutes</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    style={styleSheet.row}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f9f9f9")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "white")
                    }
                  >
                    <td style={styleSheet.td}>{item.name}</td>
                    <td style={styleSheet.td}>{item.email}</td>
                    <td style={styleSheet.td}>
                      {reformatDate(item.time)}
                    </td>
                    <td style={styleSheet.td}>{item.lateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};