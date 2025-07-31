import auth from '../models/authModule.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


// Admin Register
export async function register(req, res) {
  const { username, password, role } = req.body;

  try {
    const existingUser = await auth.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = new auth({ username, password: hashedPassword, role });
    await user.save();
    
    const token = jwt.sign(
       { _id: user._id, role: user.role },
       process.env.JWT_SECRET,
       { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// Admin Login
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await auth.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

