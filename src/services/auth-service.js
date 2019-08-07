const jwt = require('jsonwebtoken');

exports.generateToken = (data = {}) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = (token) => {
  return jwt.verify(token, global.SALT_KEY);
}

exports.isAuthorized = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      message: 'Access not allowed!'
    });
  }

  jwt.verify(token, global.SALT_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: 'Invalid token!'
      });
    }

    next();
  });
}

exports.isAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      message: 'Access not allowed!'
    });
  }

  jwt.verify(token, global.SALT_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        message: 'Invalid token!'
      });
    }

    if (!decoded.customer.roles.includes['admin']) {
      return res.status(401).send({
        message: 'Restrict only for admin users!'
      })
    }

    next();
  });
}