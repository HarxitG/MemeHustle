const { Server } = require("socket.io");

let ioInstance = null;

function initSockets(server, corsOptions) {
  const io = new Server(server, {
    cors: corsOptions,
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  ioInstance = io;
}

function getIO() {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized!");
  }
  return ioInstance;
}

module.exports = { initSockets, getIO };
