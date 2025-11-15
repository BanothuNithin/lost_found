import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/items/${id}`);
        setItem(res.data.item);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);

  const resolve = async () => {
    if (!window.confirm("Mark item as resolved?")) return;
    try {
      await api.put(`/items/${id}/resolve`);
      nav("/");
    } catch (err) {
      alert("Error");
    }
  };

  if (!item) return <div className="loading-text">Loading...</div>;

  return (
    <div className="details-container">
      <h2 className="details-title">{item.title}</h2>

      {item.photoUrl && (
        <img src={item.photoUrl} alt="item" className="details-image" />
      )}

      <p className="details-description">{item.description}</p>

      <p className="details-meta">📍 Location: {item.location}</p>
      <p className="details-meta">
        🕒 Posted: {new Date(item.createdAt).toLocaleString()}
      </p>

      <p className="details-contact">
        📞 Contact: <a href={`tel:${item.contact}`}>{item.contact}</a>
      </p>

      {!item.resolved && (
        <button className="resolve-btn" onClick={resolve}>
          Mark as Resolved
        </button>
      )}

      {item.resolved && <div className="resolved-badge">Resolved ✔</div>}
    </div>
  );
}
