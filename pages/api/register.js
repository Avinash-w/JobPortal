import dbConnect from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Find if email or phone already exists
      const existingUserByEmail = await User.findOne({ email });
      const existingUserByPhone = await User.findOne({ phone });

      if (existingUserByEmail && existingUserByPhone) {
        return res.status(400).json({ message: 'Email and phone number are already registered' });
      } else if (existingUserByEmail) {
        return res.status(400).json({ message: 'Email is already registered' });
      } else if (existingUserByPhone) {
        return res.status(400).json({ message: 'Phone number is already registered' });
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
