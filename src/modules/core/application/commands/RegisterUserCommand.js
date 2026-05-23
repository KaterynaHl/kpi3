class RegisterUserCommand {
    constructor({
      username,
      email,
      password,
    }) {
      this.username = username;
      this.email = email;
      this.password = password;
  
      Object.freeze(this);
    }
  }
  
  module.exports = RegisterUserCommand;