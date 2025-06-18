const { Server } = require("socket.io");
let ioInstance;

const io = new Server(server, { cors: corsOptions });
ioInstance = io;

// Exported so other files can access it
const getIO = () => ioInstance;

initSockets(io);

module.exports = { getIO };
