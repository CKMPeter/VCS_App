import React, { useEffect, useState } from "react";
import { incrementPresent } from "../firebase/firebaseDB";

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
  }
};

export function Member({ id, avatar, username, lastCheckinDate }) {
  const [isGreen, setIsGreen] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    setIsGreen(lastCheckinDate === today); // keep in sync with prop
  }, [lastCheckinDate]);

  const handleClick = async () => {
    const today = new Date().toISOString().split("T")[0];

    // Prevent double check-in
    if (lastCheckinDate === today || isGreen) {
      console.log(`User ${id} already checked in today`);
      return;
    }

    setIsGreen(true); // optimistic update
    try {
      await incrementPresent(id); // update DB
    } catch (err) {
      console.error("Error incrementing present:", err);
      setIsGreen(false); // rollback if failed
    }
  };

  return (
    <div
      className="member-display"
      style={styleSheet.memberDisplay}
      onClick={handleClick}
    >
      <img src={avatar} alt={username || "avatar"} style={styleSheet.avatar} />
      <div
        style={{
          ...styleSheet.overlay,
          backgroundColor: isGreen ? "rgba(0,255,0,0.4)" : "rgba(255,0,0,0.4)"
        }}
      />
    </div>
  );
}
