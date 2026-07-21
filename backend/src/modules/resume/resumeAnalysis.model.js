const mongoose = require("mongoose");
const resumeAnalysisSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  jobDescription: { type: String, default: "" },
  parsedData: {
    education: { type: Array, default: [] },
    experience: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    achievements: { type: Array, default: [] },
    certifications: { type: Array, default: [] },
    languages: { type: Array, default: [] },
    publications: { type: Array, default: [] },
    links: { type: Array, default: [] },
  },
  keywordMetrics: {
    coverage: { type: Number, default: 0 },
    missing: { type: Array, default: [] },
    duplicate: { type: Array, default: [] },
    unused: { type: Array, default: [] }
  }
}, { timestamps: true });
module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
