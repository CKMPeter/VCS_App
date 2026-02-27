import React from 'react'

const styleSheet = {
    root: {
        fontFamily: "monospace, Arial, sans-serif",
        marginTop: "2rem", 
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
    },
    tableContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: "0.6rem",
        boxShadow: "0 0.25rem 0.75rem rgba(0,0,0,0.1)",
        overflow: "hidden"
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
        fontSize: "0.9rem",
    },
    td: {
        padding: "0.75rem",
        borderBottom: "0.06rem solid #eee",
        fontSize: "0.9rem",
    },
    row: {
        transition: "background 0.2s ease",
        cursor: "pointer"
    }
}

export const LatePermissionList = ({ data }) => {
    const today = new Date().toISOString().split("T")[0];
   
    function reformatDate(dateString) {
        const date = new Date(
            dateString.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$3-$2-$1"
            )
        );
        return date.toLocaleDateString("en-GB");
    }

    const filteredData = data.filter(
        item => reformatDate(item.time) === reformatDate(today)
    );

    return (
        <div style={styleSheet.root}>
            <h2>Late Permission List</h2>

            <div style={styleSheet.tableContainer}>
                {filteredData.length === 0 ? (
                    <p style={{ padding: "1rem" }}>
                        No late permissions for today.
                    </p>
                ) : (
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
                                    onMouseEnter={e => e.currentTarget.style.background = "#f9f9f9"}
                                    onMouseLeave={e => e.currentTarget.style.background = "white"}
                                >
                                    <td style={styleSheet.td}>{item.name}</td>
                                    <td style={styleSheet.td}>{item.email}</td>
                                    <td style={styleSheet.td}>{reformatDate(item.time)}</td>
                                    <td style={styleSheet.td}>{item.lateTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}