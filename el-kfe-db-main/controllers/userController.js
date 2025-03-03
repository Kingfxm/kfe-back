const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { createUser, getUserByEmail } = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "El email ya está registrado" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await createUser(username, email, hashedPassword);

  res.status(201).json({ message: "Usuario registrado exitosamente", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
};

module.exports = { register, login };
