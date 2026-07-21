// Stopwords list for basic algorithmic filtering
const STOP_WORDS = new Set([
  "a","an","and","are","as","at","be","but","by","for","if","in","into","is","it","no","not","of","on","or","such","that","the","their","then","there","these","they","this","to","was","will","with","i","you","he","she","we","my","your","his","her","our"
]);

exports.extractKeywords = (text) => {
  if (!text) return [];
  // Tokenize by word boundaries, lowercase
  const words = text.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
  return words.filter(w => !STOP_WORDS.has(w));
};

exports.compareKeywords = (resumeText, jdText) => {
  if (!jdText) return null;

  const jdTokens = this.extractKeywords(jdText);
  const resumeTokens = this.extractKeywords(resumeText);

  // Using Set for O(1) lookups as per optimization rules
  const jdSet = new Set(jdTokens);
  
  // Using Map for counting frequencies
  const resumeFreq = new Map();
  for (const token of resumeTokens) {
    resumeFreq.set(token, (resumeFreq.get(token) || 0) + 1);
  }

  const missing = [];
  const matching = [];
  
  for (const jdWord of jdSet) {
    if (resumeFreq.has(jdWord)) {
      matching.push(jdWord);
    } else {
      missing.push(jdWord);
    }
  }

  const duplicate = [];
  const unused = [];

  for (const [word, count] of resumeFreq.entries()) {
    if (count > 1) duplicate.push(word);
    if (!jdSet.has(word)) unused.push(word);
  }

  const coverage = jdSet.size === 0 ? 0 : Math.round((matching.length / jdSet.size) * 100);

  return {
    coverage,
    missing,
    duplicate,
    unused
  };
};
