function adminMiddleware(req, res, next) {
    if (req.user && req.user.rol !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  }

module.exports = adminMiddleware