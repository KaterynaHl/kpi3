const RegisterUserDTO = require("../../application/dto/RegisterUserDTO");
const LoginUserDTO = require("../../application/dto/LoginUserDTO");

const {
  registerUserUseCase,
  loginUserUseCase,
} = require("../../container");

const register = async (req, res, next) => {
  try {
    const dto = new RegisterUserDTO(req.body);

    const user = await registerUserUseCase.execute(dto);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const dto = new LoginUserDTO(req.body);

    const token = await loginUserUseCase.execute(dto);

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