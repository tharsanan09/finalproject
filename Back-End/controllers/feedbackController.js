import Feedback from '../models/feedbackModel.js';

// ✅ POST feedback (User only)
export const postFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;

    const feedback = new Feedback({
      user: req.user._id,
      name: req.user.name,
      message,
      rating
    });

    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Feedback creation failed', error: err.message });
  }
};

// ✅ GET own feedback (User)
export const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.user._id });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Cannot fetch feedback', error: err.message });
  }
};

// ✅ GET all feedback (Admin only)
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('user', 'name email');
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch feedback', error: err.message });
  }
};

// ✅ PUT feedback (Admin only)
export const updateFeedback = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { message: req.body.message, rating: req.body.rating },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// ✅ DELETE feedback (Admin only)
export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
