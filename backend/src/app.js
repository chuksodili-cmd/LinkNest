
import express from "express";
import cors from "cors";

// 1. Import route files
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import linkRoutes from "./routes/link.routes.js";

// 2. Create Express application
const app = express();

// 3. Configure middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// 4. Register API routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/links", linkRoutes);

// 5. Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// 6. Export application
export default app;
