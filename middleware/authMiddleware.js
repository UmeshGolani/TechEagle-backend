const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check for the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error('Authorization header is missing');
    error.statusCode = 401;
    throw error;
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1]; // Bearer <token>

  // Verify token
  try {
    const decodedToken = jwt.verify(token, 'supersecretkey'); // Replace with your actual secret key

    // Attach decoded token data (user information) to the request object
    req.userData = { userId: decodedToken.userId, username: decodedToken.username };

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
};
