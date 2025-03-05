import { Server } from "socket.io";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const ADMIN = "Admin";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// state - similar to useState
const UsersState = {
  users: [],
  setUser: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

const ioServer = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : [
            "http://localhost:5500",
            "http://127.0.0.1:5500",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:3500",
            "http://127.0.0.1:3500",
            "https://simple-chatapp-jhpd.onrender.com/",
          ],
  },
});

ioServer.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // Upon connection - only to user
  socket.emit("message", buildMsg(ADMIN, "Welcome to chat app"));

  socket.on("enterRoom", ({ name, room }) => {
    // Leave previous room
    const prevRoom = getUser(socket.id)?.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      ioServer
        .to(prevRoom)
        .emit(
          "message",
          buildMsg(ADMIN, `${name} has left the room ${prevRoom}`)
        );
      ioServer.emit(
        "message",
        buildMsg(ADMIN, `You has left the room ${prevRoom}`)
      );
    }

    const user = activateUser(socket.id, name, room);

    // Cannot update previous room users list until after the state update in activate user

    if (prevRoom) {
      ioServer.to(prevRoom).emit(`userList`, {
        users: Array.from(Object.values(getUserInRoom(prevRoom))),
      });
    }

    // Join new room
    socket.join(user.room);

    // To user who joined
    socket.emit(
      "message",
      buildMsg(ADMIN, `You has join "${user.room}" chat room!`)
    );

    // To everyone
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        buildMsg(ADMIN, `User ${user.name} has joined the chat room!`)
      );

    // Update user list of the room
    ioServer.to(user.room).emit("userList", {
      users: getUserInRoom(user.room),
    });

    // Update the room list for everyone
    ioServer.emit("roomList", {
      rooms: getAllActivateRoom(),
    });
  });

  // When user disconnects - to all other
  socket.on("disconnect", () => {
    const user = getUser(socket.id);

    userLeaveApp(socket.id);

    console.log(`User ${socket.id.substring(0, 5)} disconnected`);
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} disconnected`
    );

    if (user) {
      ioServer
        .to(user.room)
        .emit(
          "message",
          buildMsg(ADMIN, `User ${user.name} has left the room`)
        );

      ioServer.to(user.room).emit("userList", {
        user: getUserInRoom(user.room),
      });

      ioServer.emit("roomList", {
        room: getAllActivateRoom(),
      });
    }
    console.log(`User ${socket.id} disconnected`);
  });

  // Listen for a message event
  socket.on("message", ({ name, text }) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      ioServer.to(room).emit("message", buildMsg(name, text));
    }
  });

  //Listen for activity
  socket.on("activity", (name) => {
    const room = getUser(socket.id)?.room;
    if (room) {
      socket.broadcast.to(room).emit("activity", name);
    }
  });
});

function buildMsg(name, text) {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
  };
}

//User function

function activateUser(id, name, room) {
  const user = { id, name, room };
  UsersState.setUser([
    ...UsersState.users.filter((user) => user.id !== id),
    user,
  ]);

  return user;
}

function userLeaveApp(id) {
  UsersState.setUser(UsersState.users.filter((user) => user.id !== id));
}

function getUser(id) {
  console.log("Id" + id);
  return UsersState.users.find((user) => user.id == id);
}

function getUserInRoom(room) {
  return UsersState.users.filter((user) => user.room === room);
}

function getAllActivateRoom() {
  return Array.from(new Set(UsersState.users.map((user) => user.room)));
}
