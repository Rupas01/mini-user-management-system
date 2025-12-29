const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const count = await User.countDocuments({});
    
    const users = await User.find({})
      .select('-password')
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.status = req.body.status;
      await user.save();
      res.json({ message: `User status updated to ${user.status}` });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, updateUserStatus };