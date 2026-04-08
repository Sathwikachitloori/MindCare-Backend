import express from "express";
import {
  createEntry,
  getEntries,
  deleteEntry,
} from "../Controller/journalController.js";

import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.post("/", protect, createEntry);
router.get("/", protect, getEntries);
router.delete("/:id", protect, deleteEntry);

export default router;