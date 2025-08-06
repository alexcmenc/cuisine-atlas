const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, ingredients, instructions, location, photo } = req.body;

    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      location,
      photo,
      createdBy: req.user.id,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "username");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "username"
    );
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
