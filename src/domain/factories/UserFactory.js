const crypto = require("crypto");
const User = require("../entities/User");
const Email = require("../value-objects/Email");
const Username = require("../value-objects/Username");
const DomainError = require("../errors/DomainError");

class UserFactory {
  constructor(userRepository, passwordHasher) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async create({ username, email, password }) {
    const emailVO = new Email(email);
    const usernameVO = new Username(username);

    const existingUser = await this.userRepository.findByEmail(emailVO.value);

    if (existingUser) {
      throw new DomainError("User with this email already exists");
    }

    const passwordHash = await this.passwordHasher.hash(password);

    return new User({
      id: crypto.randomUUID(),
      username: usernameVO,
      email: emailVO,
      passwordHash,
    });
  }
}

module.exports = UserFactory;