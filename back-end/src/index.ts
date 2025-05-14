import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "config/db.js";
import todoRoutes from "routes/todo.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
