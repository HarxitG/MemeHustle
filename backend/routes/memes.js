const express = require("express");
const router = express.Router();
const { supabase } = require("../services/supabase");
const { getCaption } = require("../services/gemini");
const { getIO } = require("../socket"); // ✅ Import socket emitter

// ✅ Create a meme
router.post("/", async (req, res) => {
  const { title, image_url, tags } = req.body;

  try {
    if (!title || !image_url || !Array.isArray(tags)) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    const { data, error } = await supabase
      .from("memes")
      .insert([
        {
          title,
          image_url,
          tags,
          upvotes: 0,
          owner_id: req.user?.id || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // ✅ Emit new meme to all clients
    const io = getIO();
    io.emit("newMeme", data);

    res.status(201).json(data);
  } catch (err) {
    console.error("Error creating meme:", err);
    res.status(500).json({ error: "Failed to create meme." });
  }
});

// ✅ Generate AI caption
router.post("/:id/caption", async (req, res) => {
  try {
    const { tags } = req.body;

    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: "Tags must be an array." });
    }

    const caption = await getCaption(tags);
    res.status(200).json({ caption });
  } catch (err) {
    console.error("Caption generation failed:", err);
    res.status(500).json({ error: "Failed to generate caption." });
  }
});

// ✅ Get all memes sorted by upvotes
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("memes")
      .select("*")
      .order("upvotes", { ascending: false });

    if (error) throw error;

    res.status(200).json(data || []);
  } catch (err) {
    console.error("Failed to fetch memes:", err);
    res.status(500).json({ error: "Failed to fetch memes." });
  }
});

// ✅ Leaderboard (top 10 only)
router.get("/leaderboard", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("memes")
      .select("*")
      .order("upvotes", { ascending: false })
      .limit(10);

    if (error) throw error;

    res.status(200).json(data || []);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard." });
  }
});

module.exports = router;
