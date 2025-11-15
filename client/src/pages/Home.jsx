import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../index.css";

// Asset images from Unsplash
const featureImage1 =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=400&fit=crop";
const featureImage2 =
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop";
const featureImage3 =
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=400&fit=crop";

export default function Home() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const { user } = useAuth();
  const nav = useNavigate();

  const fetchItems = async () => {
    try {
      const params = {};
      if (filter === "lost" || filter === "found") params.type = filter;
      if (q) params.q = q;
      const res = await api.get("/items", { params });
      setItems(Array.isArray(res.data.items) ? res.data.items : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [filter]);

  // If user not logged in, show welcome screen
  if (!user) {
    return (
      <div style={{ width: "100%" }}>
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            marginBottom: "60px",
            color: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              marginBottom: "16px",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Lost & Found 🔍
          </h1>

          <p
            style={{
              fontSize: "1.3rem",
              marginBottom: "32px",
              maxWidth: "700px",
              margin: "0 auto 32px",
              fontWeight: "300",
              opacity: "0.95",
            }}
          >
            Connect with your community. Reunite lost items with their owners or
            find what you've been looking for.
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => nav("/login")}
              style={{
                background: "white",
                color: "#667eea",
                padding: "14px 40px",
                fontSize: "1.1rem",
                cursor: "pointer",
                border: "none",
                borderRadius: "50px",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              Login
            </button>
            <button
              onClick={() => nav("/signup")}
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "14px 40px",
                fontSize: "1.1rem",
                cursor: "pointer",
                border: "2px solid white",
                borderRadius: "50px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#667eea";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Features Section - Zigzag Layout */}
        <div style={{ marginBottom: "60px" }}>
          {/* Feature 1 - Text Left, Image Right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "center",
              marginBottom: "60px",
              padding: "40px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  color: "#1f2937",
                  marginBottom: "16px",
                }}
              >
                🔍 Find What You Lost
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#6b7280",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                Have you lost something important? Browse through our
                community's found items database. Someone might have already
                picked up what you're looking for. Post a missing item report
                and let others help you reconnect with your belongings.
              </p>
              <ul
                style={{ fontSize: "1rem", color: "#6b7280", lineHeight: "2" }}
              >
                <li>✓ Search by location and category</li>
                <li>✓ Get notifications for new matches</li>
                <li>✓ Connect directly with finders</li>
              </ul>
            </div>
            <img
              src={featureImage1}
              alt="Find Items"
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />
          </div>

          {/* Feature 2 - Image Left, Text Right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "center",
              marginBottom: "60px",
              padding: "40px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <img
              src={featureImage2}
              alt="Report Found Items"
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />
            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  color: "#1f2937",
                  marginBottom: "16px",
                }}
              >
                📍 Report Found Items
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#6b7280",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                Found something that doesn't belong to you? Help reunite it with
                its owner by posting it on our platform. Upload photos, describe
                the item, and provide location details. Your good deed might
                make someone's day!
              </p>
              <ul
                style={{ fontSize: "1rem", color: "#6b7280", lineHeight: "2" }}
              >
                <li>✓ Easy photo uploads</li>
                <li>✓ Detailed item descriptions</li>
                <li>✓ Help others find their items</li>
              </ul>
            </div>
          </div>

          {/* Feature 3 - Text Left, Image Right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "center",
              padding: "40px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "2rem",
                  color: "#1f2937",
                  marginBottom: "16px",
                }}
              >
                👥 Community Power
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#6b7280",
                  lineHeight: "1.8",
                  marginBottom: "16px",
                }}
              >
                Join thousands of community members helping each other recover
                lost items. Our platform connects people in your area, making it
                easier to find and return belongings. Together, we build a more
                compassionate community.
              </p>
              <ul
                style={{ fontSize: "1rem", color: "#6b7280", lineHeight: "2" }}
              >
                <li>✓ Active community members</li>
                <li>✓ Real-time updates</li>
                <li>✓ Safe and secure connections</li>
              </ul>
            </div>
            <img
              src={featureImage3}
              alt="Community"
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: "12px",
            color: "white",
            marginTop: "40px",
          }}
        >
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "30px",
              opacity: "0.95",
            }}
          >
            Join our community today and help make a difference
          </p>
          <button
            onClick={() => nav("/signup")}
            style={{
              background: "white",
              color: "#f5576c",
              padding: "14px 50px",
              fontSize: "1.1rem",
              cursor: "pointer",
              border: "none",
              borderRadius: "50px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    );
  }

  // If logged in, show full home experience
  return (
    <div className="home-container">
      {/* Filters */}
      <div className="filter-bar">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>

        <input
          placeholder="Search items..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="search-input"
        />

        <button className="primary-btn" onClick={fetchItems}>
          Search
        </button>
      </div>

      {/* Items List */}
      <div className="item-grid">
        {items.map((it) => (
          <Link to={`/items/${it._id}`} key={it._id} className="item-card">
            <div className="item-inner">
              {it.photoUrl ? (
                <img src={it.photoUrl} alt="photo" className="item-img" />
              ) : (
                <div className="item-placeholder">No Image</div>
              )}

              <div className="item-info">
                <h3 className="item-title">{it.title}</h3>
                <p className="item-desc">{it.description?.slice(0, 80)}</p>
                <p className="item-meta">
                  {it.location} • {new Date(it.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {items.length === 0 && <div className="no-items">No items found.</div>}
    </div>
  );
}
