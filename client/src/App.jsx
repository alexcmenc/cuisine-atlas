import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AddNew from "./pages/AddNew.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/add">Add Recipe</Link>
        </nav>
      </header>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddNew />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </main>
      <footer className="ca-footer">
        © {new Date().getFullYear()} Cuisine Atlas, by Alec
      </footer>
    </BrowserRouter>
  );
}
