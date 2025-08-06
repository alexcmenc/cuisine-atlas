const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const profileRoute = require("./routes/profile");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const recipeRoutes = require("./routes/recipeRoutes");
app.use("/api/recipes", recipeRoutes);

app.use("/api/profile", profileRoute);

app.get("/", (req, res) => {
  res.send("Hello from Cuisine Atlas Backend");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http:/localhost:${PORT}`);
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
