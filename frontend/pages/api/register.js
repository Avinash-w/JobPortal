// frontend/pages/api/register.js
import dbConnect from '../../lib/db';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { name, email, password } = req.body;

    try {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
