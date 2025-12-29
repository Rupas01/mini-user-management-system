const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });
    
    const user = await User.create({ fullName, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id, fullName: user.fullName, email: user.email, role: user.role, token: generateToken(user._id)
      });
    } else res.status(400).json({ message: 'Invalid user data' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      user.lastLogin = Date.now();
      await user.save();
      res.json({
        _id: user._id, fullName: user.fullName, email: user.email, role: user.role, token: generateToken(user._id)
      });
    } else res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { registerUser, loginUser };