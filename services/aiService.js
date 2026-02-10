const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Using Gemini 2.5 Flash - latest and fastest model
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${AIzaSyBMCbXbmrsPoIxk13njWIZ4mNv8ykjTIq4}`;

/**
 * Get AI answer from Google Gemini
 */
exports.getAnswer = async (question) => {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{
          parts: [{
            text: `Answer this question with a single word or very short phrase (maximum 3 words): ${question}`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 20,
          topP: 1,
          topK: 1
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000 // 15 second timeout
      }
    );

    // Log response for debugging
    console.log('Gemini 2.5 Flash Response:', JSON.stringify(response.data, null, 2));

    // Extract answer from response
    let answer = null;
    
    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      answer = response.data.candidates[0].content.parts[0].text.trim();
    } else if (response.data?.candidates?.[0]?.output) {
      answer = response.data.candidates[0].output.trim();
    } else if (response.data?.text) {
      answer = response.data.text.trim();
    }

    if (!answer) {
      console.error('Could not extract answer. Full response:', JSON.stringify(response.data, null, 2));
      throw new Error('Invalid response from AI service');
    }

    // Clean up the answer
    answer = answer.replace(/^["']|["']$/g, ''); // Remove quotes
    answer = answer.replace(/\n/g, ' '); // Remove newlines
    
    // Extract first word or short phrase (max 3 words)
    const words = answer.split(/\s+/).filter(w => w.length > 0);
    answer = words.slice(0, Math.min(3, words.length)).join(' ');
    
    // Remove punctuation from end
    answer = answer.replace(/[.,!?;:]$/, '');

    return answer;

  } catch (error) {
    console.error('AI Service Error:', error.message);
    
    if (error.response) {
      console.error('API Status:', error.response.status);
      console.error('API Response:', JSON.stringify(error.response.data, null, 2));
      
      const errorMsg = error.response.data?.error?.message || 
                      error.response.data?.message || 
                      'Unknown error';
      throw new Error('AI service request failed: ' + errorMsg);
    } else if (error.request) {
      throw new Error('AI service not responding');
    } else {
      throw new Error(error.message || 'AI service error');
    }
  }
};