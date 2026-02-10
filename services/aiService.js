const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

exports.getAnswer = async (question) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Answer this question in a single word or very short phrase (maximum 3 words): ${question}`
              }
            ]
          }
        ],
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
        timeout: 10000
      }
    );

    const candidates = response.data?.candidates;

    if (!Array.isArray(candidates) || candidates.length === 0) {
      throw new Error('No candidates returned by AI');
    }

    const parts = candidates[0]?.content?.parts;

    if (!Array.isArray(parts)) {
      throw new Error('Invalid AI response structure');
    }

    const textPart = parts.find(
      (p) => typeof p.text === 'string' && p.text.trim().length > 0
    );

    if (!textPart) {
      throw new Error('No text content returned by AI');
    }

    let answer = textPart.text.trim();

    // normalize whitespace
    answer = answer.replace(/\s+/g, ' ');

    // limit to maximum 3 words
    answer = answer.split(' ').slice(0, 3).join(' ');

    // remove trailing punctuation
    answer = answer.replace(/[.,!?;:]+$/, '');

    return answer;
  } catch (error) {
    console.error('AI Service Error:', error.message);

    if (error.response) {
      console.error('Gemini API Error:', JSON.stringify(error.response.data));
      throw new Error(
        'AI service request failed: ' +
          (error.response.data?.error?.message || 'Unknown error')
      );
    } else if (error.request) {
      throw new Error('AI service not responding');
    } else {
      throw new Error(error.message || 'AI service error');
    }
  }
};
