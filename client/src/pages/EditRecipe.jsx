import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function EditRecipe() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/recipes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          ingredients: data.ingredients || "",
          instructions: data.instructions || "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

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
