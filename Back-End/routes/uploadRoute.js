import express from 'express';
import { upload } from '../middleware/Upload.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: req.file.path,     // Cloudinary secure_url
      publicId: req.file.filename, // Cloudinary public_id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
