const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    
    if (decoded.id !== owner) {
      error('Unauthorized', 401);
    }
  }
}

// Helper methods
function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;

  return decoded;
}

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(authorization) {
  // Validations
  if (!authorization) {
    error('Token is needed', 400);
  }

  if (authorization.indexOf('Bearer') === -1) {
    error('Invalid format', 400);
  }

  // Get token
  let token = authorization.replace('Bearer ', '');

  return token
}

// Export
module.exports = {
  sign,
  check
};