// src/services/aiService.js
import {GoogleGenerativeAI} from '@google/generative-ai';

// Replace with your API key
const API_KEY = 'AIzaSyCaYVuWzDQYCXqLZ9cC87lZaHexReJBaFE';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateLearningPath = async (hobby, level) => {
  try {
    const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});
    
    const prompt = `Create a personalized 8-step learning path for ${hobby} at the ${level} level. 
    For each step, provide:
    1. A name for the technique or skill
    2. A short description (1-2 sentences)
    3. Estimated time to master (in hours)
    4. Difficulty level (1-5)
    5. Prerequisites (if any)
    
    Format as a JSON array like:
    [
      {
        "id": "1",
        "name": "Example Technique",
        "description": "Short description here",
        "timeToMaster": "2 hours",
        "difficulty": 2,
        "prerequisites": []
      },
      // more items...
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Could not parse JSON from AI response');
  } catch (error) {
    console.error('Error generating learning path:', error);
    return generateFallbackPath(hobby, level);
  }
};

// Fallback in case AI fails
const generateFallbackPath = (hobby, level) => {
  // Some predefined paths based on hobby and level
  const fallbackPaths = {
    chess: {
      casual: [
        {
          id: '1',
          name: 'Chess Basics',
          description: 'Learn how each piece moves and basic rules of the game.',
          timeToMaster: '2 hours',
          difficulty: 1,
          prerequisites: [],
        },
        // Add more items...
      ],
      // Add more levels...
    },
    // Add more hobbies...
  };
  
  return fallbackPaths[hobby]?.[level] || [];
};