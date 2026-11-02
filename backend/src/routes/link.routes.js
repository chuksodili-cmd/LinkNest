import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createLink,
  getMyLinks,
  deleteLink,
  updateLink,
} from "../controllers/link.controller.js";

const router = express.Router();

router.post("/", protect, createLink);
router.get("/", protect, getMyLinks);
router.delete("/:id", protect, deleteLink);
router.put("/:id", protect, updateLink);

export default router;