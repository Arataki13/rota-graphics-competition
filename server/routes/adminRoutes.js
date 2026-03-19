const express = require('express');
const router = express.Router();
const { getAllSubmissions, updateSubmissionStatus, deleteSubmission } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes must be protected and restricted to admins
router.use(protect, adminOnly);

router.get('/submissions', getAllSubmissions);
router.put('/submissions/:id/status', updateSubmissionStatus);
router.delete('/submissions/:id', deleteSubmission);

module.exports = router;
