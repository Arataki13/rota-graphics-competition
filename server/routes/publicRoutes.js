const express = require('express');
const router = express.Router();
const { getApprovedSubmissions } = require('../controllers/submissionController');

router.get('/showcase', getApprovedSubmissions);

module.exports = router;
