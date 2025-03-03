const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};

const verifyRedactor = (req, res, next) => {
  if (req.user.role !== "redactor" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso restringido a redactores" });
  }
  next();
};

module.exports = { verifyToken, verifyRedactor };
