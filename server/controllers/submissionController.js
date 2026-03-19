const Submission = require('../models/Submission');

exports.createSubmission = async (req, res) => {
  try {
    const { fullName, university, faculty, email, phone } = req.body;
    
    // Check if user already submitted
    const existingSubmission = await Submission.findOne({ user: req.user._id });
    if (existingSubmission) {
      return res.status(400).json({ message: 'You have already submitted a design.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a design file (.jpg, .png, .pdf).' });
    }

    const submission = await Submission.create({
      user: req.user._id,
      fullName,
      university,
      faculty,
      email,
      phone,
      designUrl: req.file.path
    });

    res.status(201).json(submission);
  } catch (error) {
    if(error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File is too large, maximum size is 5MB' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getMySubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({ user: req.user._id });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApprovedSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ status: 'approved' })
      .select('fullName university designUrl')
      .sort('-createdAt');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
