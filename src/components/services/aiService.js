import {GoogleGenerativeAI} from '@google/generative-ai';
import {GEMINI_API, YOUTBE_API} from '@env';
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

// Complete solution for generating technique-specific learning content
export const generateTechniqueContent = async (hobby, level, technique) => {
  try {
    // Step 1: Generate appropriate YouTube search queries based on technique details
    const queries = await generateTechniqueQueries(hobby, technique);
    
    // Step 2: Fetch actual YouTube videos using the YouTube API
    const videos = await fetchYouTubeVideos(queries);
    
    // Step 3: Generate the formatted learning content with the found videos
    return formatLearningContent(hobby, level, technique, videos);
  } catch (error) {
    console.error('Error generating technique content:', error);
    return fallbackContent(hobby, technique);
  }
};

/**
 * Generate technique-specific search queries for YouTube
 */
const generateTechniqueQueries = async (hobby, technique) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Extract key components from the technique
    const techniqueComponents = extractTechniqueComponents(technique);
    
    const prompt = `
Generate search queries for YouTube videos that teach "${technique.name}" in ${hobby}.

TECHNIQUE DETAILS:
- Name: ${technique.name}
- Description: ${technique.description}
- Time to master: ${technique.timeToMaster}
- Difficulty level: ${technique.difficulty}/5
- Prerequisites: ${technique.prerequisites.join(', ')}

KEY COMPONENTS TO LEARN:
${techniqueComponents.map(comp => `- ${comp}`).join('\n')}

IMPORTANT REQUIREMENTS:
1. Create search queries that will find videos teaching each key component
2. Prioritize videos that collectively can be learned within ${technique.timeToMaster}
3. Match the difficulty level (${technique.difficulty}/5) in your queries
4. Always include "${hobby}" in the queries for context

RESPOND WITH ONLY an array of search query strings, formatted as JSON.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the array from the response
    let queries = [];
    try {
      // Look for JSON array syntax
      const match = text.match(/\[([\s\S]*)\]/);
      if (match) {
        queries = JSON.parse(match[0]);
      } else {
        // Fallback - extract quoted strings
        const matches = text.match(/"([^"]*)"/g);
        if (matches) {
          queries = matches.map(m => m.replace(/"/g, ''));
        }
      }
    } catch (error) {
      console.error('Error parsing queries:', error);
    }
    
    // Ensure we have at least some queries
    if (queries.length === 0) {
      queries = defaultQueries(hobby, technique);
    }
    
    return queries;
  } catch (error) {
    console.error('Error generating queries:', error);
    return defaultQueries(hobby, technique);
  }
};

/**
 * Extract key components from a technique to learn
 */
const extractTechniqueComponents = (technique) => {
  // If the technique name has multiple components (like "Castling and En Passant")
  const nameParts = technique.name.split(/\band\b|,|\+/);
  
  // Start with direct components from name
  const components = [...nameParts];
  
  // Extract key phrases from the description
  const descriptionWords = technique.description.split(/\s+/);
  let phrases = [];
  
  // Look for capitalized terms which often indicate important concepts
  descriptionWords.forEach((word, index) => {
    if (/^[A-Z][a-z]{2,}/.test(word) && !components.includes(word)) {
      phrases.push(word);
    }
  });
  
  // Combine everything, remove duplicates, and ensure proper formatting
  return [...new Set([...components, ...phrases])]
    .map(comp => comp.trim())
    .filter(comp => comp.length > 0);
};

/**
 * Generate default queries if AI generation fails
 */
const defaultQueries = (hobby, technique) => {
  const name = technique.name;
  
  // If technique has multiple parts (e.g., "Castling and En Passant")
  const parts = name.split(/\band\b|,|\+/).map(part => part.trim());
  
  const queries = [];
  
  // Add general query
  queries.push(`${hobby} ${name} tutorial`);
  
  // Add specific queries for each part
  parts.forEach(part => {
    if (part && part !== name) {
      queries.push(`${hobby} ${part} explained`);
      queries.push(`how to ${part.toLowerCase()} in ${hobby}`);
    }
  });
  
  // Add difficulty-appropriate queries
  if (technique.difficulty <= 3) {
    queries.push(`beginner ${hobby} ${name} guide`);
  } else {
    queries.push(`advanced ${hobby} ${name} tutorial`);
  }
  
  return queries;
};

/**
 * Fetch YouTube videos based on search queries
 */
const fetchYouTubeVideos = async (queries) => {
  const results = [];
  
  try {
    // Process each query (limit to prevent excessive API usage)
    const processQueries = queries.slice(0, Math.min(queries.length, 5));
    
    for (const query of processQueries) {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${encodeURIComponent(query)}&type=video&videoDuration=medium&key=${YOUTBE_API}`
      );
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract video information
      const videos = data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnailUrl: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description
      }));
      
      results.push(...videos);
    }
    
    // Filter out duplicates based on videoId
    const uniqueVideos = [];
    const videoIds = new Set();
    
    for (const video of results) {
      if (!videoIds.has(video.videoId)) {
        videoIds.add(video.videoId);
        uniqueVideos.push(video);
      }
    }
    
    // Return an appropriate number of videos based on available results
    return uniqueVideos.slice(0, Math.min(uniqueVideos.length, 5));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
};

/**
 * Format the final learning content with videos and context
 */
const formatLearningContent = async (hobby, level, technique, videos) => {
  try {
    // If we have videos, create a rich learning path with the exact video links
    if (videos && videos.length > 0) {
      // Extract emoji for the hobby
      const emoji = getHobbyEmoji(hobby);
      
      // Create introduction and tips using AI
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      
      const prompt = `
You are creating content for a learning path on "${technique.name}" in ${hobby}.

CONTEXT:
- Hobby: ${hobby}
- User level: ${level.name} (${level.description})
- Technique: ${technique.name}
- Technique description: ${technique.description}
- Time to master: ${technique.timeToMaster}
- Difficulty: ${technique.difficulty}/5
- Prerequisites: ${technique.prerequisites.join(', ')}

TASK:
Create ONLY these two components:
1. A brief introduction to the technique (2-3 sentences)
2. 2-3 practical tips for learning this technique
3. A motivational quote relevant to mastering this technique (under 15 words)

FORMAT YOUR RESPONSE EXACTLY LIKE THIS:
INTRODUCTION:
[Your introduction here]

TIPS:
- [Tip 1]
- [Tip 2]
- [Tip 3]

QUOTE:
[Your motivational quote]

REQUIREMENTS:
- Keep introduction specific to this technique and appropriate for a ${level.name} learner
- Make tips practical and actionable
- Ensure quote is inspiring and relevant to learning this specific technique
`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract the parts from the AI response
      const introMatch = text.match(/INTRODUCTION:\s*([\s\S]*?)(?=TIPS:|$)/);
      const tipsMatch = text.match(/TIPS:\s*([\s\S]*?)(?=QUOTE:|$)/);
      const quoteMatch = text.match(/QUOTE:\s*([\s\S]*?)$/);
      
      const introduction = introMatch ? introMatch[1].trim() : 
        `Learn the essential technique of ${technique.name} in ${hobby}. This ${technique.difficulty}/5 difficulty skill can be mastered in about ${technique.timeToMaster}.`;
      
      const tipsText = tipsMatch ? tipsMatch[1].trim() : 
        "- Break down the technique into smaller steps\n- Practice regularly for short periods\n- Focus on understanding rather than memorizing";
      
      const quote = quoteMatch ? quoteMatch[1].trim() : 
        `Mastering ${technique.name} opens new dimensions in your skill.`;
      
      // Build the final markdown with the EXACT video URLs from the API
      let content = `# ${emoji} ${technique.name}\n\n`;
      content += `${introduction}\n\n`;
      content += `## 📚 Curated Resources\n`;
      
      // Add the videos with their exact URLs
      videos.forEach(video => {
        content += `- [ ] [${video.title}](${video.url})\n`;
      });
      
      content += `\n## 💡 Quick Tips\n${tipsText}\n\n`;
      content += `## 🌟 Motivational Boost\n_"${quote}"_\n`;
      
      return content;
    } else {
      // No videos found, create generic content
      return fallbackContent(hobby, technique);
    }
  } catch (error) {
    console.error('Error formatting learning content:', error);
    return fallbackContent(hobby, technique);
  }
};

/**
 * Generate enhanced fallback content when videos aren't available
 */
const fallbackContent = async (hobby, technique) => {
  try {
    // Generate rich fallback content using AI
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `
You are creating an engaging learning guide for "${technique.name}" in ${hobby} without using videos.

CONTEXT:
- Hobby: ${hobby}
- Technique: ${technique.name}
- Description: ${technique.description}
- Time to master: ${technique.timeToMaster}
- Difficulty: ${technique.difficulty}/5
- Prerequisites: ${technique.prerequisites.join(', ')}

TASK:
Create a rich, engaging learning guide that includes:
1. A vivid, detailed introduction (3-4 sentences)
2. A step-by-step breakdown of how to learn this technique (3-5 steps)
3. Common mistakes to avoid when learning this technique (2-3 points)
4. Practical exercises to master this technique (2-3 exercises)
5. An inspirational quote about mastering new skills

FORMAT YOUR RESPONSE AS MARKDOWN:
# [Emoji] Technique Name

[Your introduction]

## 📝 Learning Pathway
1. [Step 1 with detailed explanation]
2. [Step 2 with detailed explanation]
...

## ⚠️ Common Mistakes to Avoid
- [Mistake 1 with why it happens and how to avoid]
- [Mistake 2 with why it happens and how to avoid]
...

## ✨ Practice Exercises
- [Exercise 1 with clear instructions]
- [Exercise 2 with clear instructions]
...

## 🌟 Words of Wisdom
_"[Your inspirational quote]"_

IMPORTANT REQUIREMENTS:
- Make content vivid, detailed and specific to ${technique.name} - NOT generic
- Include specific details about how this technique works in ${hobby}
- Write in an engaging, encouraging style
- Make exercises practical and actionable
- Focus on making this content valuable even without video resources
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();
    
    // Ensure proper emoji is used
    const emoji = getHobbyEmoji(hobby);
    content = content.replace(/# \[Emoji\]/, `# ${emoji}`);
    content = content.replace(/# .*/, `# ${emoji} ${technique.name}`);
    
    return content;
  } catch (error) {
    console.error('Error generating fallback content:', error);
    
    // Ultimate fallback if even AI generation fails
    const emoji = getHobbyEmoji(hobby) || '🎯';
    
    return `# ${emoji} ${technique.name}

${technique.description}

## 📝 Learning Pathway
1. **Understand the basics**: Start by thoroughly understanding what ${technique.name} is and when to use it in ${hobby}.
2. **Break it down**: Divide the technique into smaller, manageable components and practice each separately.
3. **Gradual integration**: Slowly combine the components until you can perform the complete technique.
4. **Regular practice**: Dedicate time specifically to practicing this technique within your ${hobby} sessions.

## ⚠️ Common Mistakes to Avoid
- **Rushing the process**: Take your time to master each element before moving on.
- **Skipping fundamentals**: Ensure you've mastered the prerequisites (${technique.prerequisites.join(', ')}) first.
- **Inconsistent practice**: Regular, short practice sessions are better than occasional long ones.

## ✨ Practice Exercises
- **Shadow practice**: Practice the movements slowly without pressure, focusing on correct form.
- **Scenario application**: Create specific scenarios where you can apply ${technique.name} and practice responding appropriately.
- **Teach someone else**: Try explaining ${technique.name} to another person to solidify your understanding.

## 🌟 Words of Wisdom
_"Mastery comes not from occasional brilliance but from consistent practice. Each small step with ${technique.name} builds toward excellence."_`;
  }
};


// Helper functions
const getHobbyEmoji = hobbyName => {
  const hobby = hobbyData.hobbies.find(
    h => h.name.toLowerCase() === hobbyName.toLowerCase(),
  );
  return hobby?.emoji || '✨';
};

