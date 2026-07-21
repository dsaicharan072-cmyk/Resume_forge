const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  fileUrl: { type: String, required: true },
  originalName: { type: String, required: true },
  fileType: { type: String, required: true },
  size: { type: Number, required: true },
  status: { type: String, enum: ['UPLOADED', 'PARSED', 'ANALYZED'], default: 'UPLOADED' },
}, { timestamps: true });
module.exports = mongoose.model("Resume", resumeSchema);
