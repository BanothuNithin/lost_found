import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("lost");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title || !type || !contact) {
      setError("Title, type, and contact are required");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("type", type);
      form.append("location", location);
      form.append("contact", contact);
      if (photo) form.append("photo", photo);

      const res = await api.post("/items/create", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setType("lost");
      setLocation("");
      setContact("");
      setPhoto(null);
      setPhotoPreview(null);
      nav("/dashboard");
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || err.message || "Error creating item";
      setError(errorMsg);
      console.error("Error details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0%, 100% {
            background-position: -1000px 0;
          }
          50% {
            background-position: 1000px 0;
          }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
          animation: "slideUp 0.6s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "40px 30px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "2.2rem",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Post an Item 📝
          </h1>
          <p
            style={{
              fontSize: "1rem",
              opacity: "0.95",
              marginBottom: "0",
            }}
          >
            Help your community by reporting a lost or found item
          </p>
        </div>

        {/* Form Container */}
        <div style={{ padding: "40px 30px" }}>
          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "24px",
                fontSize: "0.95rem",
                border: "1px solid #fecaca",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={submit}>
            {/* Title Input */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                📌 Item Title <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Black Wallet, Silver Ring..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
            </div>

            {/* Description Input */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                📄 Description
              </label>
              <textarea
                placeholder="Provide details about the item, color, brand, condition, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  minHeight: "100px",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Type Selector */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                🔍 Item Type <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  background: "white",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="lost">😕 Lost Item</option>
                <option value="found">🎉 Found Item</option>
              </select>
            </div>

            {/* Location Input */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                📍 Location
              </label>
              <input
                type="text"
                placeholder="Where was it lost/found? e.g., Central Park, Downtown Bus Station"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Contact Input */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                ☎️ Contact Info <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Your email or phone number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                required
              />
            </div>

            {/* Photo Upload */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                📸 Upload Photo
              </label>
              <label
                style={{
                  display: "block",
                  padding: "24px",
                  border: "2px dashed #667eea",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: photoPreview ? "transparent" : "#f3f4f6",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#764ba2";
                  e.currentTarget.style.background = "#f9f5ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                  e.currentTarget.style.background = photoPreview
                    ? "transparent"
                    : "#f3f4f6";
                }}
              >
                {photoPreview ? (
                  <div>
                    <img
                      src={photoPreview}
                      alt="Preview"
                      style={{
                        maxHeight: "200px",
                        borderRadius: "8px",
                        marginBottom: "12px",
                      }}
                    />
                    <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                      ✓ Photo selected. Click to change
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
                      📤
                    </div>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "1rem",
                        marginBottom: "4px",
                      }}
                    >
                      Click to upload or drag and drop
                    </p>
                    <p
                      style={{
                        color: "#9ca3af",
                        fontSize: "0.85rem",
                      }}
                    >
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{
                    display: "none",
                  }}
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: loading
                  ? "linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.05rem",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(102, 126, 234, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(102, 126, 234, 0.4)";
                }
              }}
            >
              {loading ? "⏳ Uploading..." : "✅ Post Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
