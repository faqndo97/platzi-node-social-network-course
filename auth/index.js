const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    
    if (decoded.id !== owner) {
      throw new Error('No puedes hacer esto');
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
    throw new Error('Token is needed');
  }

  if (authorization.indexOf('Bearer') === -1) {
    throw new Error('Invalid format');
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