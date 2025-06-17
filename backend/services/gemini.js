const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports.getCaption = async (tags = []) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const prompt = `Generate a short, funny cyberpunk-style meme caption using these tags: ${tags.join(
      ", "
    )}`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = await result.response.text();
    return text;
  } catch (error) {
    console.error("❌ Gemini Error:", error);
    return "⚠️ Failed to generate caption.";
  }
};
