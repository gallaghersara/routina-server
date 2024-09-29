const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET
  const expiresIn = '1h';

  const payload = {
    id: user.id,
    email: user.email,
  };

  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = generateToken;


