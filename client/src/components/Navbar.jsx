import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../index.css"; // Ensure this includes the CSS below

const logoUrl =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=40&h=40&fit=crop";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "0 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "70px",
        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
        position: "sticky",
        top: "0",
        zIndex: "100",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={logoUrl}
              alt="Lost & Found"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <span
            style={{
              color: "white",
              fontSize: "1.3rem",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            Lost & Found 🔍
          </span>
        </Link>

        {/* Navigation Links */}
        {user && (
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Link
              to="/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: "500",
                padding: "8px 12px",
                borderRadius: "6px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/create"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: "500",
                padding: "8px 12px",
                borderRadius: "6px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ➕ Create Item
            </Link>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {user ? (
          <>
            <span
              style={{
                color: "white",
                fontSize: "0.95rem",
                fontWeight: "500",
                padding: "8px 16px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "6px",
              }}
            >
              👤 {user.name}
            </span>
            <button
              onClick={logout}
              style={{
                background: "rgba(255,255,255,0.3)",
                color: "white",
                border: "2px solid rgba(255,255,255,0.5)",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.4)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.3)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "6px",
                transition: "all 0.3s ease",
                background: "rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              🔐 Login
            </Link>
            <Link
              to="/signup"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: "600",
                padding: "8px 16px",
                borderRadius: "6px",
                background: "white",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
            >
              ✨ Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
