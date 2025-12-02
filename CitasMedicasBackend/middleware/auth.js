const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'la_clave_secreta_para_jwt';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, JWT_SECRET };
