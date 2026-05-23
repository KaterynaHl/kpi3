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
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new DomainError("Email already exists");
    }

    const passwordHash = await this.passwordHasher.hash(password);

    return new User({
      id: crypto.randomUUID(),
      username: new Username(username),
      email: new Email(email),
      passwordHash,
    });
  }
}

module.exports = UserFactory;