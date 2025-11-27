const express = require('express');
const { createSession, markSessionSent, markSessionUsed } = require('../controllers/sessionController');

const router = express.Router();

router.post('/sessions', createSession);
router.post('/sessions/sent', markSessionSent);
router.get('/', markSessionUsed);

module.exports = router;

