const express = require("express");
const router = express.Router();
const { supabase } = require("../services/supabase");
const { getIO } = require("../socket"); // ✅ Import for socket

router.post("/:id", async (req, res) => {
  const { type } = req.body;
  const increment = type === "up" ? 1 : -1;
  const memeId = req.params.id;

  const { error } = await supabase.rpc("increment_upvotes", {
    meme_id: memeId,
    value: increment,
  });

  if (error) return res.status(500).json(error);

  // ✅ Emit vote update to all clients
  const io = getIO();
  io.emit("voteUpdate", { id: memeId, increment });

  res.json({ success: true });
});

module.exports = router;
