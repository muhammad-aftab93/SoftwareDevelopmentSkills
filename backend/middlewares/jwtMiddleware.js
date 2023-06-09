const jwt = require('jsonwebtoken');
const configs = require('../constants/configs');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, configs.secretKey, (err, decoded) => {
    if (err)
      return res.status(401).json({ error: 'Invalid token, Please login!' });

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
