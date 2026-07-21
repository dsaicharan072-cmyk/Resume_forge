const mongoose = require("mongoose");
const resumeVersionSchema = new mongoose.Schema({
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
  versionName: { type: String, required: true, enum: ['Backend Resume', 'Frontend Resume', 'AI Resume', 'Full Stack Resume', 'Custom'] },
  parsedData: { type: Object, required: true },
}, { timestamps: true });
module.exports = mongoose.model("ResumeVersion", resumeVersionSchema);