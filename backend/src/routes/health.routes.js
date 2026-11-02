
import { Router } from "express";

const router = Router();

// Check whether our backend is alive
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome! LinkNest backend is working!"
  });
});

export default router;
