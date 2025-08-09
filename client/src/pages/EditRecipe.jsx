import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const RECIPES = "/api/recipes"; // <-- change to "/recipes" if your backend has no /api

export default function EditRecipe() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}${RECIPES}/${id}`);
        if (!r.ok) throw new Error(await r.text());
        const data = await r.json();
        setForm({
          title: data.title || "",
          ingredients: data.ingredients || "",
          instructions: data.instructions || "",
        });
      } catch (e) {
        setErr(e.message || "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await fetch(`${API}${RECIPES}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error(await r.text());
      navigate("/");
    } catch (e) {
      alert(`Update failed: ${e.message || e}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 600 }}>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        required
      />
      <textarea
        value={form.instructions}
        onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        required
      />
      <button type="submit">Update Recipe</button>
    </form>
  );
}
