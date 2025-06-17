const express = require("express");
const router = express.Router();
const { supabase } = require("../services/supabase");

router.post("/:id", async (req, res) => {
  const { type } = req.body;
  const increment = type === "up" ? 1 : -1;
  const { error } = await supabase.rpc("increment_upvotes", {
    meme_id: req.params.id,
    value: increment,
  });
  if (error) return res.status(500).json(error);
  res.json({ success: true });
});

module.exports = router;
