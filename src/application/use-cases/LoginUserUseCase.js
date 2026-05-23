const DomainError = require("../../domain/errors/DomainError");

class LoginUserUseCase {
  constructor(userRepository, passwordHasher, tokenService) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute(dto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new DomainError("Invalid credentials");
    }

    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
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

module.exports = LoginUserUseCase;