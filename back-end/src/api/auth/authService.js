const secret = require('fs').readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const auth = {
  secret,
  expires: '1h',
};

module.exports = auth;