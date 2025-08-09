// src/pages/AddNew.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const RECIPES = "/api/recipes"; 

export default function AddNew() {
  const [form, setForm] = useState({ title: "", ingredients: "", instructions: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}${RECIPES}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const msg = await res.text();
      alert(`Create failed: ${msg}`);
      return;
    }
    navigate("/");
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 600 }}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Ingredients"
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        required
      />
      <textarea
        placeholder="Instructions"
        value={form.instructions}
        onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        required
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}
