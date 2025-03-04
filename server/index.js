const ws = require("ws");
const servert = new ws.Server({ port: 8080 });

servert.on("connection", (socket) => {
  socket.on("message", (message) => {
    const buffer = Buffer.from(message);
    console.log(buffer.toString());
    socket.send("Echo: " + message);
  });
});
