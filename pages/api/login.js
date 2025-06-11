import dbConnect from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({ message: 'Email/Phone and Password are required' });
    }

    try {
      const user = await User.findOne(email ? { email } : { phone });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          experienceLevel: user.experienceLevel,
          city: user.city,
          workStatus: user.workStatus
        }
      });

    } catch (err) {
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
