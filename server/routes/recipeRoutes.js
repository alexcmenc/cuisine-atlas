import { Router } from "express";
import Recipe from "../models/Recipe.js";

const router = Router();

// READ all
router.get("/", async (_req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.json(recipes);
});

// READ one
router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// CREATE
router.post("/", async (req, res) => {
  const created = await Recipe.create(req.body);
  res.status(201).json(created);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
