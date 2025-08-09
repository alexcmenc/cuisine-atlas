import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api.js";

const RECIPES = "/api/recipes";

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
        const data = await api(`${RECIPES}/${id}`);
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
      await api(`${RECIPES}/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
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
