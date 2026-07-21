const express = require('express');
const router = express.Router();
const careerController = require('./career.controller');

// POST /career/match
router.post('/match', (req, res, next) => careerController.getCompanyMatch(req, res, next));

// POST /career/skill-gap
router.post('/skill-gap', (req, res, next) => careerController.getSkillGap(req, res, next));

// GET /career/roadmap
router.get('/roadmap', (req, res, next) => careerController.getRoadmap(req, res, next));

module.exports = router;
