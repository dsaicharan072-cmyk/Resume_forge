const STORAGE_KEY = 'resumeForgeCareerProfile';

const KNOWN_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'Node.js', 'Node',
  'Express', 'Python', 'Java', 'C++', 'C#', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'REST APIs', 'GraphQL',
  'HTML', 'CSS', 'Tailwind CSS', 'Figma', 'Power BI', 'Tableau', 'Machine Learning',
  'Data Analysis', 'System Design', 'Spring Boot', 'Django', 'Flask', 'Angular', 'Vue.js'
];

const roleFromSkills = (skills) => {
  const has = (skill) => skills.some((item) => item.toLowerCase() === skill.toLowerCase());
  if (has('Machine Learning') || has('Data Analysis') || has('Power BI') || has('Tableau')) return 'Data Analyst';
  if (has('React Native')) return 'Mobile Developer';
  if (has('React') || has('Angular') || has('Vue.js')) return has('Node.js') || has('Node') ? 'Full Stack Developer' : 'Frontend Developer';
  if (has('Node.js') || has('Node') || has('Java') || has('Python')) return 'Software Developer';
  return 'Technology Professional';
};

export const createCareerProfile = (analysis = {}) => {
  const parsedData = analysis.parsedData || analysis.data?.parsedData || {};
  const source = Object.values(parsedData).flat().join(' ');
  const normalizedSource = source.toLowerCase();
  const skills = KNOWN_SKILLS.filter((skill) => {
    const variants = skill === 'Node.js' ? ['node.js', 'nodejs', 'node '] : [skill.toLowerCase()];
    return variants.some((variant) => normalizedSource.includes(variant));
  });
  const experienceText = (parsedData.experience || []).join(' ');
  const ranges = experienceText.match(/\b(20\d{2})\b/g)?.map(Number) || [];
  const experienceYears = ranges.length >= 2
    ? Math.max(0, Math.min(20, new Date().getFullYear() - Math.min(...ranges)))
    : 0;

  return {
    skills,
    experienceYears,
    targetRole: roleFromSkills(skills),
    resumeName: analysis.originalName || analysis.resumeName || 'Uploaded resume',
    updatedAt: new Date().toISOString()
  };
};

export const saveCareerProfile = (analysis) => {
  const profile = createCareerProfile(analysis);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
};

export const getCareerProfile = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.skills?.length) return saved;
  } catch {
    // A malformed browser value should never prevent Career OS from loading.
  }

  return {
    skills: [],
    experienceYears: 0,
    targetRole: 'your target role',
    resumeName: null
  };
};

export const targetSkillsFor = (profile) => {
  const base = profile.targetRole === 'Data Analyst'
    ? ['SQL', 'Python', 'Data Analysis', 'Power BI', 'Tableau']
    : profile.targetRole === 'Frontend Developer'
      ? ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Git']
      : ['JavaScript', 'TypeScript', 'React', 'Node.js', 'REST APIs', 'Git', 'Docker'];
  return [...new Set([...profile.skills, ...base])];
};
