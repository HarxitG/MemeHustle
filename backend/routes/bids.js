const express = require("express");
const router = express.Router();
const { supabase } = require("../services/supabase");

router.post("/:id", async (req, res) => {
  const { credits } = req.body;
  const { error } = await supabase.from("bids").insert([
    {
      meme_id: req.params.id,
      user_id: req.user.id,
      credits,
    },
  ]);
  if (error) return res.status(500).json(error);
  res.json({ success: true });
});

module.exports = router;
