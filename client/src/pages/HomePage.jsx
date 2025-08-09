import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;
const RECIPES = "/api/recipes";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API}${RECIPES}`);
        if (!r.ok) throw new Error(await r.text());
        const data = await r.json();
        setRecipes(data);
      } catch (e) {
        setErr(e.message || "Failed to load recipes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${API}${RECIPES}/${id}`, { method: "DELETE" });
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <div>
      <h1>Traveler&apos;s Recipe Journal</h1>
      {recipes.length === 0 && <p>No recipes yet. Click “Add Recipe”.</p>}
      {recipes.map((r) => (
        <article key={r._id} className="ca-card">
          <h3>{r.title}</h3>
          <p>
            <b>Ingredients:</b> {r.ingredients}
          </p>
          <p>
            <b>Instructions:</b> {r.instructions}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <Link to={`/edit/${r._id}`}>Edit</Link>
            <button onClick={() => handleDelete(r._id)}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
}
