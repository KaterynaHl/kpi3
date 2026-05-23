class User {
    constructor({
      id,
      username,
      email,
      passwordHash,
      createdAt = new Date(),
    }) {
      this.id = id;
      this.username = username.toString();
      this.email = email.toString();
      this.passwordHash = passwordHash;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = User;