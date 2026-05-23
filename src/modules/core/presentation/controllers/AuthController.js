const RegisterUserCommand = require("../../application/commands/RegisterUserCommand");
const LoginUserCommand = require("../../application/commands/LoginUserCommand");

class AuthController {
  constructor(coreModule) {
    this.coreModule = coreModule;
  }

  register = async (req, res, next) => {
    try {
      const command = new RegisterUserCommand(req.body);

      const userId = await this.coreModule.registerUser(command);

      res.status(201).json({
        id: userId,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const command = new LoginUserCommand(req.body);

      const token = await this.coreModule.loginUser(command);

      res.json({
        token,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;