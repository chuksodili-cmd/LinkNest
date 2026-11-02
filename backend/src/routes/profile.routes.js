
import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  createProfile,
  getMyProfile,
  updateMyProfile,
  getPublicProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/", protect, createProfile);

router.get("/me", protect, getMyProfile);

router.put("/me", protect, updateMyProfile);

router.get("/public/:username", getPublicProfile);

export default router;
