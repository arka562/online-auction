import jwt from "jsonwebtoken";

const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requiredRole && decoded.userType !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: Invalid role" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalid or expired" });
    }
  };
};

export default authMiddleware;
