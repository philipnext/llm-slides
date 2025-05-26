const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // For loading environment variables

const app = express();
const port = 3000;

// CORS設定
app.use(cors());
app.use(express.json()); // For parsing application/json

// Google Gemini APIキーの取得
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
	console.error("GEMINI_API_KEY is not set in .env file.");
	process.exit(1);
}
const genAI = new GoogleGenerativeAI(API_KEY);

app.post("/generate-slides", async (req, res) => {
	const { prompt } = req.body;

	if (!prompt) {
		return res.status(400).json({ error: "Prompt is required." });
	}

	try {
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		// ここでLLMからのテキストレスポンスをスライドデータにパースするロジックを実装
		// 例: テキストを改行で分割し、各行をスライドのタイトルやコンテンツとして扱う
		const slidesData = text.split("\n\n").map((slideContent, index) => {
			const lines = slideContent.split("\n");
			const title = lines[0].replace(/#+\s*/, "").trim(); // Remove markdown headers
			const content = lines.slice(1).join("\n").trim();
			return {
				title: title || `スライド ${index + 1}`,
				content: content || "コンテンツなし",
			};
		});

		res.json({ slides: slidesData });
	} catch (error) {
		console.error("Error generating slides:", error);
		res.status(500).json({ error: "Failed to generate slides from LLM." });
	}
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
