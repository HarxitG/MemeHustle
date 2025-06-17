const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const memeRoutes = require("./routes/memes");
const bidRoutes = require("./routes/bids");
const voteRoutes = require("./routes/votes");
const initSockets = require("./socket");

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
  cors: corsOptions,
});

// Mock user for demo purposes
app.use((req, res, next) => {
  req.user = { id: "cyberpunk420" };
  next();
});

// Routes
app.use("/memes", memeRoutes);
app.use("/bids", bidRoutes);
app.use("/votes", voteRoutes);

initSockets(io);

server.listen(5000, () => console.log("🚀 Server running on port 5000"));
