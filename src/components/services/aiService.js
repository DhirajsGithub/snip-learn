import {GoogleGenerativeAI} from '@google/generative-ai';
import {GEMINI_API} from '@env';
import hobbyData from '../../assets/data.json';
const genAI = new GoogleGenerativeAI(GEMINI_API);

export const generateLearningPath = async (hobby, level) => {
  try {
    const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});

    const prompt = `
                Create a personalized learning path for the hobby: "${hobby}" at the "${level.name}" level.
                
                Context:
                - Level description: ${level.description}
                - Weekly time commitment: ${level.timeCommitment}
                - The goal is to help the user enjoy and grow in this hobby without overwhelming them.
                - Provide between 5 to 10 steps — enough to make meaningful progress, but not exhaustive.
                
                For each step, include:
                1. "id": step number
                2. "name": the technique or concept
                3. "description": a concise 1-2 sentence explanation
                4. "timeToMaster": estimated time to learn the skill (in hours)
                5. "difficulty": on a scale of 1 (easy) to 5 (hard)
                6. "prerequisites": an ordered list of names of earlier steps this one depends on (use exact "name" fields), or an empty list if none. Maintain the order they appear in the path.
                7. "optional": true/false — whether this step can be skipped
                
                Ensure the steps follow a logical order, and keep the tone friendly and beginner-appropriate based on the level.
                
                Return only a JSON array in this format:
                [
                  {
                    "id": "1",
                    "name": "Example Skill",
                    "description": "Short explanation",
                    "timeToMaster": "2 hours",
                    "difficulty": 2,
                    "prerequisites": [],
                    "optional": false
                  }
                  // more items...
                ]
                `;

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

export const generateTechniqueContent = async (hobby, level, technique) => {
  try {
    const model = genAI.getGenerativeModel({model: 'gemini-2.0-flash'});

    const prompt = `Create a comprehensive learning guide for ${
      technique.name
    } in ${hobby} at ${level} level. 
    Use this exact template with emojis and markdown formatting:

    # [EMOJI] ${technique.name}
    
    ## 🎯 Why This Matters
    ${technique.description}
    
    ## 📊 Key Stats
    ⏳ **Time to Master**: ${technique.timeToMaster}  
    🏋️ **Difficulty**: ${'★'.repeat(technique.difficulty)}${'☆'.repeat(
      5 - technique.difficulty,
    )}  
    🧩 **Prerequisites**: ${
      technique.prerequisites.length > 0
        ? technique.prerequisites.join(', ')
        : 'None'
    }
    
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
    return text
      .replace(/```markdown/g, '')
      .replace(/```/g, '')
      .trim();
  } catch (error) {
    console.error('Error generating technique content:', error);
    return fallbackContent(technique);
  }
};

// Helper functions
const getHobbyEmoji = hobbyName => {
  const hobby = hobbyData.hobbies.find(
    h => h.name.toLowerCase() === hobbyName.toLowerCase(),
  );
  return hobby?.emoji || '✨';
};

const fallbackContent = technique => {
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
