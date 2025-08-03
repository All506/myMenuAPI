const authorizeRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;
    console.log(user)
    if (!user || !allowedRoles.includes(user.rol)) {
      return res.status(403).json({ error: 'Access denied: Insufficient permissions' });
    }

    next();
  };
};

module.exports = authorizeRole;