const secret = require('fs').readFileSync('jwt.evaluation.key');

const auth = {
  secret,
  expires: '1h',
};

module.exports = auth;