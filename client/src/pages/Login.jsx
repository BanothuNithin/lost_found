import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const loginImage =
  "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=800&fit=crop";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        minHeight: "100vh",
        background: "white",
      }}
    >
      {/* Image Side */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.3",
            zIndex: "0",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: "1",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Welcome Back! 👋
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "30px",
              opacity: "0.95",
              lineHeight: "1.6",
            }}
          >
            Log in to access your account and reconnect with lost and found
            items in your community.
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "20px",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
              ✓ Safe & Secure
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "10px" }}>
              ✓ Fast Recovery
            </p>
            <p style={{ fontSize: "1rem" }}>✓ Community Support</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 60px",
          background: "white",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "10px",
              color: "#1f2937",
              fontWeight: "bold",
            }}
          >
            Login
          </h2>
          <p
            style={{ color: "#6b7280", marginBottom: "30px", fontSize: "1rem" }}
          >
            Enter your credentials to access your account
          </p>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "20px",
                fontSize: "0.95rem",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <input
              style={{
                width: "100%",
                padding: "12px 16px",
                marginBottom: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={{
                width: "100%",
                padding: "12px 16px",
                marginBottom: "24px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "none";
              }}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.4)";
              }}
            >
              Login
            </button>
          </form>

          <p
            style={{ textAlign: "center", marginTop: "24px", color: "#6b7280" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#764ba2")}
              onMouseLeave={(e) => (e.target.style.color = "#667eea")}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
