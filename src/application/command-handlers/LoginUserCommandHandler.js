const DomainError = require("../../domain/errors/DomainError");

class LoginUserCommandHandler {
  constructor(userRepository, passwordHasher, tokenService) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async handle(command) {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new DomainError("Invalid credentials");
    }

    const isPasswordValid = await this.passwordHasher.compare(
      command.password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      throw new DomainError("Invalid credentials");
    }

    return this.tokenService.sign({
      id: user.id,
      email: user.email,
    });
  }
}

module.exports = LoginUserCommandHandler;