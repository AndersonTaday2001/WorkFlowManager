import express from "express";
import { getDatabase } from "./config/db.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express.js server!");
});

app.get("/test-db", async (req, res) => {
  try {
    const db = getDatabase();
    const result = await db.query(
      "SELECT 'Database connection successful!' as message, NOW() as timestamp"
    );
    res.json({
      status: "success",
      data: result[0],
      message: "Database connection test passed",
    });
  } catch (error) {
    console.error("Error testing database connection:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection test failed",
      error: error.message,
    });
  }
});

export default app;
