const ACTION_VERBS = new Set(["developed", "managed", "led", "created", "designed", "implemented", "achieved", "improved", "increased", "resolved", "coordinated", "delivered"]);

exports.calculateScore = (parsedData, keywordMetrics) => {
  const breakdown = [];
  let totalScore = 0;

  // 1. Keyword Coverage (Max 30)
  const coverageRatio = (keywordMetrics && keywordMetrics.coverage) ? keywordMetrics.coverage : 0;
  const keywordScore = Math.min(30, Math.round((coverageRatio / 100) * 30));
  breakdown.push({
    category: 'Keyword Coverage',
    score: keywordScore,
    maxScore: 30,
    reason: `Based on ${coverageRatio}% keyword match with the job description.`
  });
  totalScore += keywordScore;

  // 2. Projects (Max 20)
  const numProjects = parsedData.projects ? parsedData.projects.length : 0;
  let projectScore = 0;
  if (numProjects >= 2) projectScore = 20;
  else if (numProjects === 1) projectScore = 10;
  breakdown.push({
    category: 'Projects',
    score: projectScore,
    maxScore: 20,
    reason: projectScore === 20 ? 'Found 2 or more projects.' : (projectScore === 10 ? 'Found 1 project. Add more for a better score.' : 'No projects found.')
  });
  totalScore += projectScore;

  // 3. Achievements (Max 15)
  const numAchievements = parsedData.achievements ? parsedData.achievements.length : 0;
  let achievementScore = 0;
  if (numAchievements >= 2) achievementScore = 15;
  else if (numAchievements === 1) achievementScore = 7;
  breakdown.push({
    category: 'Achievements',
    score: achievementScore,
    maxScore: 15,
    reason: achievementScore === 15 ? 'Found strong achievements section.' : (achievementScore > 0 ? 'Found 1 achievement.' : 'No achievements found.')
  });
  totalScore += achievementScore;

  // 4. Formatting & Essential Sections (Max 10)
  let formatScore = 10;
  const missingHeaders = [];
  if (!parsedData.education || parsedData.education.length === 0) { formatScore -= 3; missingHeaders.push('Education'); }
  if (!parsedData.experience || parsedData.experience.length === 0) { formatScore -= 3; missingHeaders.push('Experience'); }
  if (!parsedData.skills || parsedData.skills.length === 0) { formatScore -= 3; missingHeaders.push('Skills'); }
  formatScore = Math.max(0, formatScore);
  breakdown.push({
    category: 'Formatting',
    score: formatScore,
    maxScore: 10,
    reason: formatScore === 10 ? 'All essential sections (Education, Experience, Skills) are present.' : `Missing essential sections: ${missingHeaders.join(', ')}.`
  });
  totalScore += formatScore;

  // 5. Action Verbs (Max 10)
  const experienceText = (parsedData.experience || []).join(' ').toLowerCase();
  const projectText = (parsedData.projects || []).join(' ').toLowerCase();
  const combinedText = `${experienceText} ${projectText}`.split(/\s+/);
  
  let verbCount = 0;
  for (const word of combinedText) {
    if (ACTION_VERBS.has(word)) verbCount++;
  }
  
  let verbScore = 0;
  if (verbCount >= 5) verbScore = 10;
  else if (verbCount >= 3) verbScore = 6;
  else if (verbCount >= 1) verbScore = 3;

  breakdown.push({
    category: 'Action Verbs',
    score: verbScore,
    maxScore: 10,
    reason: verbScore === 10 ? 'Strong use of action verbs.' : 'Consider using more strong action verbs (e.g., developed, managed, led) to describe your work.'
  });
  totalScore += verbScore;

  // 6. Education (Max 5)
  const eduScore = (parsedData.education && parsedData.education.length > 0) ? 5 : 0;
  breakdown.push({
    category: 'Education',
    score: eduScore,
    maxScore: 5,
    reason: eduScore === 5 ? 'Education section is present.' : 'Missing Education section.'
  });
  totalScore += eduScore;

  // 7. Experience (Max 10)
  const numExp = parsedData.experience ? parsedData.experience.length : 0;
  let expScore = 0;
  if (numExp >= 2) expScore = 10;
  else if (numExp === 1) expScore = 5;
  breakdown.push({
    category: 'Experience',
    score: expScore,
    maxScore: 10,
    reason: expScore === 10 ? 'Sufficient professional experience.' : (expScore === 5 ? 'Only 1 experience entry found.' : 'No professional experience found.')
  });
  totalScore += expScore;

  return {
    total: totalScore,
    breakdown
  };
};
