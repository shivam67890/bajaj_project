const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Get AI answer from Google Gemini
 */
exports.getAnswer = async (question) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Answer this question with a single word or very short phrase (maximum 3 words): ${question}`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 10,
          topP: 1,
          topK: 1
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      let answer = response.data.candidates[0].content.parts[0].text.trim();
      
      // Extract first word or short phrase
      const words = answer.split(/\s+/);
      answer = words.slice(0, Math.min(3, words.length)).join(' ');
      
      // Remove punctuation from end
      answer = answer.replace(/[.,!?;:]$/, '');
      
      return answer;
    } else {
      throw new Error('Invalid response from AI service');
    }

  } catch (error) {
    console.error('AI Service Error:', error.message);
    
    if (error.response) {
      console.error('API Response:', error.response.data);
      throw new Error('AI service request failed: ' + (error.response.data?.error?.message || 'Unknown error'));
    } else if (error.request) {
      throw new Error('AI service not responding');
    } else {
      throw new Error(error.message || 'AI service error');
    }
  }
};
