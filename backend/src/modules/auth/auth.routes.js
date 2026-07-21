/**
 * @file auth.routes.js
 * @description Express routes for authentication.
 * 
 * Purpose: Map HTTP endpoints to controller methods.
 * Input: HTTP requests
 * Output: Routed to controllers
 * Time Complexity: O(1) route matching
 * Space Complexity: O(1)
 * Edge Cases: N/A
 */

const express = require('express');
const authController = require('./auth.controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
