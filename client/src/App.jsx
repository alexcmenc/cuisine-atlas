import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/recipes/:id" element={<RecipeDetails />} />
    </Routes>
  );
}

export default App;
