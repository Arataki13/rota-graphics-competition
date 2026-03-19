const express = require('express');
const router = express.Router();
const { createSubmission, getMySubmission } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('design'), createSubmission);
router.get('/me', protect, getMySubmission);

module.exports = router;
