import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";

const RECIPES = "/api/recipes";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api(RECIPES); // <-- use api helper
        setRecipes(data);
      } catch (e) {
        setErr(e.message || "Failed to load recipes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api(`${RECIPES}/${id}`, { method: "DELETE" }); // <-- use api helper
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;

  return (
    <div>
      <h1
        style={{ display: "flex", justifyContent: "center" }}
        className="page-title"
      >
        Traveler's Recipe Journal
      </h1>
      {recipes.length === 0 && <p>No recipes yet. Click “Add Recipe”.</p>}
      {recipes.map((r) => (
        <div style={{}}>
          <article
            key={r._id}
            className="ca-card"
            style={{
              textAlign: "center",
              border: "1px solid navy-blue",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              margin: "30px",
            }}
          >
            <h3>{r.title}</h3>
            <p>
              <b>Ingredients:</b> {r.ingredients}
            </p>
            <p>
              <b>Instructions:</b> {r.instructions}
            </p>
            <div
              style={{
                display: "flex",
                gap: 25,
                margin: "10px",
                justifyContent: "end",
              }}
            >
              <button style={{ alignContent: "center" }} className="update-btn">
                <Link to={`/edit/${r._id}`}>Update</Link>
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="delete-btn"
                style={{ padding: "10px" }}
              >
                Delete
              </button>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
