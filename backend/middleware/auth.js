const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ IMPORTANT: ensure id exists
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
