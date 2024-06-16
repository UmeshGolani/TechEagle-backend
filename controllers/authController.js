const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'supersecretkey',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    next(err);
  }
};
