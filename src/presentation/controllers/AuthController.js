const RegisterUserCommand = require("../../application/commands/RegisterUserCommand");
const LoginUserCommand = require("../../application/commands/LoginUserCommand");

const {
  registerUserCommandHandler,
  loginUserCommandHandler,
} = require("../../container");

const register = async (req, res, next) => {
  try {
    const command = new RegisterUserCommand(req.body);

    const userId = await registerUserCommandHandler.handle(command);

    res.status(201).json({
      id: userId,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const command = new LoginUserCommand(req.body);

    const token = await loginUserCommandHandler.handle(command);

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};