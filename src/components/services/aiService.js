// src/services/aiService.js
import {GoogleGenerativeAI} from '@google/generative-ai';
import hobbyData from '../../assets/data.json';

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
    return null;
  }
};

export const generateTechniqueContent = async (
  hobby,
  level,
  technique
) => {
  try {
    const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});
    
    const prompt = `Create a comprehensive learning guide for ${technique.name} in ${hobby} at ${level} level. 
    Use this exact template with emojis and markdown formatting:

    # [EMOJI] ${technique.name}
    
    ## 🎯 Why This Matters
    ${technique.description}
    
    ## 📊 Key Stats
    ⏳ **Time to Master**: ${technique.timeToMaster}  
    🏋️ **Difficulty**: ${'★'.repeat(technique.difficulty)}${'☆'.repeat(5 - technique.difficulty)}  
    🧩 **Prerequisites**: ${technique.prerequisites.length > 0 ? technique.prerequisites.join(', ') : 'None'}
    
    ## 🚀 Step-by-Step Learning
    [Provide 3-5 clear steps to learn this technique]
    
    ## 💎 Pro Tips
    [3 actionable tips for faster mastery]
    
    ## ⚠️ Common Mistakes
    [3 common errors to avoid]
    
    ## 🔥 Practice Plan (${technique.timeToMaster})
    [Breakdown of practice sessions]
    
    ## 🌟 Motivational Boost
    [Short encouraging quote]
    
    Rules:
    1. Use ${getHobbyEmoji(hobby)} emoji in title
    2. Keep all section headers exactly as shown
    3. Make content practical and engaging
    4. Use markdown formatting (bold, lists, etc.)
    5. Never invent new stats - use only provided time/difficulty`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up the response
    return text.replace(/```markdown/g, '').replace(/```/g, '').trim();
  } catch (error) {
    console.error('Error generating technique content:', error);
    return fallbackContent(technique);
  }
};

// Helper functions
const getHobbyEmoji = (hobbyName) => {
  const hobby = hobbyData.hobbies.find(h => h.name.toLowerCase() === hobbyName.toLowerCase());
  return hobby?.emoji || '✨';
};

const fallbackContent = (technique) => {
  return `
# ${technique.name}

## Description
${technique.description}

## Details
⏳ Time: ${technique.timeToMaster}  
⭐ Difficulty: ${technique.difficulty}/5  
📚 Prerequisites: ${technique.prerequisites.join(', ') || 'None'}

*Could not generate enhanced content - please check your connection*
  `;
};