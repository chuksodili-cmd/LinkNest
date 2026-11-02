
import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMyProfile } from "../controllers/user.controller.js";

const router = express.Router();

// Get information about the logged-in user
router.get("/me", protect, getMyProfile);

export default router;
