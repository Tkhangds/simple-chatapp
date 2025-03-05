import { Server } from "socket.io";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const ioServer = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

ioServer.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Upon connection - only to user

  socket.emit("message", "Welcome to chatapp");

  // Upong to user - to all other

  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} connected`
  );

  // Listen for a message event
  socket.on("message", (data) => {
    console.log(data);
    ioServer.emit("message", `${socket.id.substring(0, 5)} : ${data}`);
  });

  // When user disconnects - to all other
  socket.on("disconnect", () => {
    console.log(`User ${socket.id.substring(0, 5)} disconnected`);
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} connected`
    );
  });

  //Listen for activity

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});
