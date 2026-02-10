const { generateText } = require("ai");
const { google } = require("@ai-sdk/google");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

exports.getAnswer = async (question) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash", {
        apiKey: GEMINI_API_KEY,
      }),
      prompt: `Answer this question in a single word or very short phrase (maximum 3 words): ${question}`,
      maxTokens: 10,
      temperature: 0.1,
      topP: 1,
    });

    // normalize whitespace
    let answer = text.trim().replace(/\s+/g, " ");

    // limit to maximum 3 words
    answer = answer.split(" ").slice(0, 3).join(" ");

    // remove trailing punctuation
    answer = answer.replace(/[.,!?;:]+$/, "");

    return answer;
  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new Error(error.message || "AI service error");
  }
};