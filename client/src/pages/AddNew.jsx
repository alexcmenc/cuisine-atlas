// src/pages/AddNew.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js"; 

const RECIPES = "/api/recipes"; 

export default function AddNew() {
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api(RECIPES, {
        method: "POST",
        body: JSON.stringify(form),
      });
      navigate("/");
    } catch (e) {
      alert(`Create failed: ${e.message || e}`);
    }
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
