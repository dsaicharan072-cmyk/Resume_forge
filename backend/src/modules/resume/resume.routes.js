const express = require("express");
const router = express.Router();
const resumeController = require('./resume.controller');
const { upload } = require('./resume.validator');

router.post('/upload', upload.single('resume'), resumeController.uploadResume);

module.exports = router;
