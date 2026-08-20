import React, { useState } from "react";
import { FaFacebookSquare, FaInstagram, FaTiktok } from "react-icons/fa";

export const NavBar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        backgroundColor: "#002B00",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ul className="navBar" style={styleSheet.navBar}>
        <li>
          <a
            href="/"
            style={{
              ...styleSheet.navItem,
              ...(hovered === "home" ? styleSheet.navItemHover : {}),
            }}
            onMouseEnter={() => setHovered("home")}
            onMouseLeave={() => setHovered(null)}
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="/checkin"
            style={{
              ...styleSheet.navItem,
              ...(hovered === "checkin" ? styleSheet.navItemHover : {}),
            }}
            onMouseEnter={() => setHovered("checkin")}
            onMouseLeave={() => setHovered(null)}
          >
            Check-in
          </a>
        </li>

        <li>
          <a
            href="/detail"
            style={{
              ...styleSheet.navItem,
              ...(hovered === "detail" ? styleSheet.navItemHover : {}),
            }}
            onMouseEnter={() => setHovered("detail")}
            onMouseLeave={() => setHovered(null)}
          >
            Details
          </a>
        </li>
      </ul>

      <div style={styleSheet.iconTray}>
        <a
          href="https://www.facebook.com/fae.vcs"
          style={{
            ...styleSheet.navItem,
            ...(hovered === "facebook" ? styleSheet.navItemHover : {}),
          }}
          onMouseEnter={() => setHovered("facebook")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaFacebookSquare />
        </a>

        <a
          href="https://www.instagram.com/verdancy2011/?hl=en"
          style={{
            ...styleSheet.navItem,
            ...(hovered === "instagram" ? styleSheet.navItemHover : {}),
          }}
          onMouseEnter={() => setHovered("instagram")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.tiktok.com/@fie.vcs"
          style={{
            ...styleSheet.navItem,
            ...(hovered === "tiktok" ? styleSheet.navItemHover : {}),
          }}
          onMouseEnter={() => setHovered("tiktok")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaTiktok />
        </a>
      </div>
    </div>
  );
};

const styleSheet = {
  navBar: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#002B00",
    padding: "5px",
    listStyleType: "none",
    gap: "1rem",
  },

  navItem: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.5rem",
    transition: "0.2s",
  },

  navItemHover: {
    color: "#008000",
    transform: "scale(2)",
  },

  iconTray: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1.5rem",
    padding: "10px",
  },
};
