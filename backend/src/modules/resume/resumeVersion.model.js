const mongoose = require("mongoose");
const resumeVersionSchema = new mongoose.Schema({});
module.exports = mongoose.model("ResumeVersion", resumeVersionSchema);