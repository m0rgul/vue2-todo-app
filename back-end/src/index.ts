import express from "express";
import dotenv from "dotenv";
import { connectDB } from "config/db.js";

import { createServer } from "http";
import { Server } from "socket.io";
import { registerTodoSocketHandlers } from "sockets/todo.sockets.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  registerTodoSocketHandlers(socket, io);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
