import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaInstagram, FaTiktok } from "react-icons/fa";

export const NavBar = () => {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        ...styleSheet.navContainer,
        ...(isMobile ? styleSheet.navContainerMobile : {}),
      }}
    >
      {/* Navigation Links */}
      <ul
        className="navBar"
        style={{
          ...styleSheet.navBar,
          ...(isMobile ? styleSheet.navBarMobile : {}),
        }}
      >
        <li>
          <a
            href="/"
            style={{
              ...styleSheet.navItem,
              ...(isMobile ? styleSheet.navItemMobile : {}),
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
              ...(isMobile ? styleSheet.navItemMobile : {}),
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
              ...(isMobile ? styleSheet.navItemMobile : {}),
              ...(hovered === "detail" ? styleSheet.navItemHover : {}),
            }}
            onMouseEnter={() => setHovered("detail")}
            onMouseLeave={() => setHovered(null)}
          >
            Details
          </a>
        </li>
      </ul>

      {/* Social Media */}
      <div
        style={{
          ...styleSheet.iconTray,
          ...(isMobile ? styleSheet.iconTrayMobile : {}),
        }}
      >
        <a
          href="https://www.facebook.com/fae.vcs"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          style={{
            ...styleSheet.navItem,
            ...(isMobile ? styleSheet.navItemMobile : {}),
            ...(hovered === "facebook" ? styleSheet.navItemHover : {}),
          }}
          onMouseEnter={() => setHovered("facebook")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaFacebookSquare />
        </a>

        <a
          href="https://www.instagram.com/verdancy2011/?hl=en"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          style={{
            ...styleSheet.navItem,
            ...(isMobile ? styleSheet.navItemMobile : {}),
            ...(hovered === "instagram" ? styleSheet.navItemHover : {}),
          }}
          onMouseEnter={() => setHovered("instagram")}
          onMouseLeave={() => setHovered(null)}
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.tiktok.com/@fie.vcs"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          style={{
            ...styleSheet.navItem,
            ...(isMobile ? styleSheet.navItemMobile : {}),
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
  /* =========================
     DESKTOP
  ========================= */

  navContainer: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#002B00",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#002B00",
    padding: "5px",
    margin: 0,
    listStyleType: "none",
    gap: "1.5rem",
  },

  navItem: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.5rem",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  navItemHover: {
    color: "#008000",
    transform: "scale(1.15)",
  },

  iconTray: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "1.5rem",
    padding: "10px",
  },

  /* =========================
     MOBILE
  ========================= */

  navContainerMobile: {
    padding: "8px 12px",
  },

  navBarMobile: {
    gap: "0.7rem",
    padding: "3px",
  },

  navItemMobile: {
    fontSize: "1rem",
  },

  iconTrayMobile: {
    gap: "0.8rem",
    padding: "5px",
  },
};