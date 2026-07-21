const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({});
module.exports = mongoose.model("Resume", resumeSchema);