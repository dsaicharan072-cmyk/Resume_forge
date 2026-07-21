const express = require("express");
const router = express.Router();
const resumeController = require('./resume.controller');
const { upload } = require('./resume.validator');

router.post('/upload', upload.single('resume'), resumeController.uploadResume);
router.post('/analyze', resumeController.analyzeResume);
router.get('/:id/analysis', resumeController.getResumeAnalysis);
router.post('/rewrite', resumeController.rewriteResume);
router.post('/version', resumeController.createResumeVersion);
router.get('/version/:id', resumeController.getResumeVersion);
router.get('/:resumeId/versions', resumeController.listResumeVersions);
router.post('/export', resumeController.exportResume);

module.exports = router;
