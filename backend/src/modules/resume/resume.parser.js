const axios = require('axios');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs/promises');

exports.extractText = async (fileUrl, fileType) => {
  const buffer = fileUrl.startsWith('local://')
    ? await fs.readFile(fileUrl.replace('local://', ''))
    : (await axios.get(fileUrl, { responseType: 'arraybuffer' })).data;
  
  if (fileType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileType === 'application/msword') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
  throw new Error("Unsupported file format for parsing.");
};

exports.parseResumeText = (text) => {
  const sections = {
    education: [],
    experience: [],
    projects: [],
    skills: [],
    achievements: [],
    certifications: [],
    languages: [],
    publications: [],
    links: []
  };

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  let currentSection = null;
  const sectionHeaders = {
    education: /^(education|academic background|academics)$/i,
    experience: /^(experience|work experience|employment history|professional experience)$/i,
    projects: /^(projects|personal projects|academic projects)$/i,
    skills: /^(skills|technical skills|core competencies)$/i,
    achievements: /^(achievements|awards|honors)$/i,
    certifications: /^(certifications|licenses|courses)$/i,
    languages: /^(languages)$/i,
    publications: /^(publications|research papers)$/i,
  };

  const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const allLinks = text.match(linkRegex) || [];
  sections.links = Array.from(new Set(allLinks));

  let sectionContent = [];

  const saveSection = () => {
    if (currentSection && sectionContent.length > 0) {
      sections[currentSection].push(sectionContent.join('\n'));
    }
    sectionContent = [];
  };

  for (const line of lines) {
    let matched = false;
    for (const [key, regex] of Object.entries(sectionHeaders)) {
      if (regex.test(line)) {
        saveSection();
        currentSection = key;
        matched = true;
        break;
      }
    }
    if (!matched && currentSection) {
      sectionContent.push(line);
    }
  }
  saveSection();

  return sections;
};
