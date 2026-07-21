const mongoose = require("mongoose");
const resumeAnalysisSchema = new mongoose.Schema({});
module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);