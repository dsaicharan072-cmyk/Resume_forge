const fs = require('fs');
const path = require('path');

const files = [
  'src/features/career/pages/CompanyMatch.jsx',
  'src/features/career/pages/SkillGap.jsx',
  'src/features/career/pages/LearningRoadmap.jsx',
  'src/features/career/pages/RecommendedProjects.jsx',
  'src/features/career/pages/InterviewPreparation.jsx',
  'src/features/career/pages/LiveJobs.jsx',
  'src/features/career/pages/ApplicationTracker.jsx'
];

const replacements = [
  { from: /text-slate-900/g, to: 'text-foreground' },
  { from: /text-slate-800/g, to: 'text-foreground' },
  { from: /text-slate-700/g, to: 'text-muted' },
  { from: /text-slate-600/g, to: 'text-muted' },
  { from: /text-slate-500/g, to: 'text-muted' },
  { from: /bg-white/g, to: 'bg-surface' },
  { from: /bg-slate-50/g, to: 'bg-surface-hover' },
  { from: /bg-slate-100/g, to: 'bg-surface-hover' },
  { from: /bg-slate-200/g, to: 'bg-surface-hover' },
  { from: /border-slate-100/g, to: 'border-border' },
  { from: /border-slate-200/g, to: 'border-border' },
  { from: /border-slate-300/g, to: 'border-border' },
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(r => {
      content = content.replace(r.from, r.to);
    });
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  } else {
    console.log('File not found: ' + file);
  }
});
