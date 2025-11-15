import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Make sure CSS is imported

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("lost");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!title || !type) return alert("Title and type required");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("type", type);
      form.append("location", location);
      if (photo) form.append("photo", photo);

      await api.post("/items/create", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Lost / Found Item</h2>
      <form onSubmit={submit} className="form">
        <input
          className="form-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="form-row">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <input
            className="form-input flex-input"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="form-file"
        />
        <button type="submit" className="form-button">
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
