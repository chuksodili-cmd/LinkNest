import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  try {
    // Get the token from the request header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Please log in.",
      });
    }

    // Remove the word "Bearer " and keep the token
    const token = authHeader.split(" ")[1];

    // Verify that the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save the user's ID for the next function
    req.user = decoded;

    // Allow the request to continue
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
    });
  }
}