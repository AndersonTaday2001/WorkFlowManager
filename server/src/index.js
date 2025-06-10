import "dotenv/config.js";
import app from "./app.js";

const PORT = process.env.PORT_SERVER || 3000;

app
  .listen(PORT, () => {
    console.log(`✅ Server is running on: http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error("❌ Failed to start server:", err);
  });
