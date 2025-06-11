
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import dbConnect from '../../lib/db';
import User from '../../models/User';

// Disable bodyParser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Set up multer storage
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Helper to run multer with a promise
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  await runMiddleware(req, res, upload.single('file'));

  await dbConnect();

  const userId = req.body.userId;
  const filePath = `/uploads/${req.file.filename}`;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: filePath },
      { new: true }
    );

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: filePath,
      user: updatedUser,
    });
  } catch (err) {
    console.error('DB update error:', err);
    res.status(500).json({ error: 'Failed to update user image' });
  }
}

