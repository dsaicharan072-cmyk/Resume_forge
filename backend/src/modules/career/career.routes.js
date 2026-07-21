const express = require('express');
const router = express.Router();
const careerController = require('./career.controller');

// POST /career/match
router.post('/match', (req, res, next) => careerController.getCompanyMatch(req, res, next));

module.exports = router;
