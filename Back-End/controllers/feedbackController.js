import { Feedback } from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
  try {
    const { name, message } = req.body;
    const feedback = await Feedback.create({ name, message });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
