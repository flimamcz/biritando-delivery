const auth = {
  secret: String(process.env.SECRET) || 'secret_key',
  expires: '1h',
};

module.exports = auth;