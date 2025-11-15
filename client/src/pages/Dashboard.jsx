import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(Array.isArray(res.data.items) ? res.data.items : []);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const resolveItem = async (id) => {
    try {
      await api.put(`/items/${id}/resolve`);
      loadItems();
    } catch (err) {
      alert("Error marking item as resolved");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = items.filter((item) => {
    if (filter === "found") return item.type === "found";
    if (filter === "lost") return item.type === "lost";
    if (filter === "resolved") return item.resolved;
    if (filter === "active") return !item.resolved;
    return true;
  });

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              marginBottom: "20px",
              animation: "spin 1s linear infinite",
            }}
          >
            ⏳
          </div>
          <p style={{ fontSize: "1.2rem" }}>Loading items...</p>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "40px 20px",
      }}
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "3rem",
              color: "#1f2937",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Community Lost & Found 🔍
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#6b7280",
              marginBottom: "30px",
            }}
          >
            Browse all items in the community. Together we help find what's
            lost!
          </p>

          {/* Filter Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "all", label: "All Items", emoji: "📋" },
              { id: "lost", label: "Lost", emoji: "😕" },
              { id: "found", label: "Found", emoji: "🎉" },
              { id: "active", label: "Active", emoji: "⚡" },
              { id: "resolved", label: "Resolved", emoji: "✅" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background:
                    filter === btn.id
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "#e5e7eb",
                  color: filter === btn.id ? "white" : "#1f2937",
                  boxShadow:
                    filter === btn.id
                      ? "0 4px 15px rgba(102, 126, 234, 0.4)"
                      : "0 2px 4px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  if (filter !== btn.id) {
                    e.target.style.background = "#d1d5db";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== btn.id) {
                    e.target.style.background = "#e5e7eb";
                  }
                }}
              >
                {btn.emoji} {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {!filteredItems.length ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📭</div>
            <h2 style={{ color: "#1f2937", marginBottom: "10px" }}>
              No items found
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
              Try adjusting your filter or create a new item
            </p>
          </div>
        ) : (
          <>
            {/* Items Count */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px",
                color: "#6b7280",
                fontSize: "1rem",
              }}
            >
              Showing <strong>{filteredItems.length}</strong> of{" "}
              <strong>{items.length}</strong> items
            </div>

            {/* Items Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                gap: "30px",
              }}
            >
              {filteredItems.map((item, index) => (
                <div
                  key={item._id}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(0,0,0,0.1)";
                  }}
                >
                  {/* Image Container */}
                  <div
                    style={{
                      position: "relative",
                      height: "220px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.photoUrl ? (
                      <img
                        src={item.photoUrl}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: "3rem" }}>📦</div>
                    )}

                    {/* Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background:
                          item.type === "lost"
                            ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                            : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      {item.type === "lost" ? "😕 Lost" : "🎉 Found"}
                    </div>

                    {/* Resolved Badge */}
                    {item.resolved && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          background:
                            "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        }}
                      >
                        ✅ Resolved
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px" }}>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        color: "#1f2937",
                        marginBottom: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                        marginBottom: "16px",
                        fontSize: "0.95rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Info Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          background: "#f3f4f6",
                          padding: "10px",
                          borderRadius: "6px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#9ca3af",
                            marginBottom: "4px",
                          }}
                        >
                          Type
                        </p>
                        <p
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "bold",
                            color: "#1f2937",
                          }}
                        >
                          {item.type}
                        </p>
                      </div>

                      <div
                        style={{
                          background: "#f3f4f6",
                          padding: "10px",
                          borderRadius: "6px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#9ca3af",
                            marginBottom: "4px",
                          }}
                        >
                          Location
                        </p>
                        <p
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "bold",
                            color: "#1f2937",
                          }}
                        >
                          {item.location}
                        </p>
                      </div>

                      <div
                        style={{
                          background: "#f3f4f6",
                          padding: "10px",
                          borderRadius: "6px",
                          gridColumn: "1 / -1",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "#9ca3af",
                            marginBottom: "4px",
                          }}
                        >
                          Contact
                        </p>
                        <p
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "bold",
                            color: "#1f2937",
                          }}
                        >
                          {item.contact}
                        </p>
                      </div>
                    </div>

                    {/* Creator */}
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#9ca3af",
                        marginBottom: "16px",
                        paddingBottom: "16px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      👤 Posted by{" "}
                      <strong>{item.createdBy?.name || "Anonymous"}</strong>
                    </p>

                    {/* Action Button */}
                    {!item.resolved && (
                      <button
                        onClick={() => resolveItem(item._id)}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          background:
                            "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "1rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 6px 16px rgba(16, 185, 129, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 4px 12px rgba(16, 185, 129, 0.3)";
                        }}
                      >
                        ✅ Mark Resolved
                      </button>
                    )}

                    {item.resolved && (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "12px",
                          background: "#d1fae5",
                          color: "#065f46",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "0.95rem",
                        }}
                      >
                        ✅ This item has been resolved
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
