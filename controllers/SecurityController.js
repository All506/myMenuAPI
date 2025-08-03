const securityService = require('../services/SecurityService');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await securityService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.tokenVerification = (req, res) => {
  // Obtains header for Bearer
  const authHeader = req.headers['authorization'];
  const token = securityService.tokenVerification(authHeader);
  res.json({ token })
};
