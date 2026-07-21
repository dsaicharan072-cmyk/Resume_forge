const axios = require('axios');

const WEAK_VERBS = ["worked", "helped", "responsible for", "made", "created", "did", "got", "took"];

exports.detectWeakVerbs = (bullets) => {
  const weakBullets = [];
  
  if (!Array.isArray(bullets)) return weakBullets;

  for (const bullet of bullets) {
    const lowerBullet = bullet.toLowerCase();
    let hasWeakVerb = false;
    for (const verb of WEAK_VERBS) {
      // Use regex to match whole words/phrases
      const regex = new RegExp(`\\b${verb}\\b`);
      if (regex.test(lowerBullet)) {
        hasWeakVerb = true;
        break;
      }
    }
    if (hasWeakVerb) {
      weakBullets.push(bullet);
    }
  }
  
  return weakBullets;
};

exports.rewriteBullets = async (bullets) => {
  if (!bullets || bullets.length === 0) return [];
  
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    // Fallback if API key is missing (for local testing/skeleton completeness)
    return bullets.map(b => `[AI Mock] Improved version of: ${b}`);
  }

  try {
    const prompt = `Rewrite the following resume bullets to improve grammar, ensure professional tone, replace weak verbs with strong action verbs, and suggest achievement quantification where possible:\n\n${bullets.join('\n')}\n\nReturn the exact same number of rewritten bullets, separated by newlines, with no additional text.`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4",
      messages: [{ role: "system", content: "You are an expert resume writer." }, { role: "user", content: prompt }],
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const aiText = response.data.choices[0].message.content;
    return aiText.split('\n').map(l => l.replace(/^- /, '').trim()).filter(l => l.length > 0);
  } catch (error) {
    console.error("AI API Error:", error.message);
    throw new Error("Failed to process AI rewrite");
  }
};