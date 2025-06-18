const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

const memeRoutes = require("./routes/memes");
const bidRoutes = require("./routes/bids");
const voteRoutes = require("./routes/votes");
const { initSockets } = require("./socket"); // ✅ updated import

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

initSockets(server, corsOptions); // ✅ initialize socket with server & CORS

// Mock user
app.use((req, res, next) => {
  req.user = { id: "cyberpunk420" };
  next();
});

// Routes
app.use("/memes", memeRoutes);
app.use("/bids", bidRoutes);
app.use("/votes", voteRoutes);

server.listen(5000, () => console.log("🚀 Server running on port 5000"));
