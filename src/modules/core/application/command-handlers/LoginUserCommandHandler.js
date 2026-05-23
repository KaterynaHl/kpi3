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

    const isValid = await this.passwordHasher.compare(command.password, user.passwordHash);

    if (!isValid) {
      throw new DomainError("Invalid credentials");
    }

    const token = this.tokenService.generate({ userId: user.id });

    return { token };
  }
}

module.exports = LoginUserCommandHandler;