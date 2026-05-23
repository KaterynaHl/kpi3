const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { users } = require("../repositories/db");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = users.find(
    (u) => u.email === email || u.username === username
  );

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword,
  };

  users.push(user);

  res.status(201).json(user);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "secretkey"
  );

  res.json({
    token,
  });
};

module.exports = {
  register,
  login,
};