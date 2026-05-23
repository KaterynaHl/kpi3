const UserRepository = require("../../domain/repositories/UserRepository");

class InMemoryUserRepository extends UserRepository {
  constructor(store) {
    super();
    this.store = store;
  }

  async save(user) {
    this.store.users.push(user);
    return user;
  }

  async findByEmail(email) {
    return this.store.users.find((user) => user.email === email) || null;
  }

  async findById(id) {
    return this.store.users.find((user) => user.id === id) || null;
  }
}

module.exports = InMemoryUserRepository;