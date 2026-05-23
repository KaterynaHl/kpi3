const bcrypt = require("bcrypt");
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

module.exports = {
  register,
};