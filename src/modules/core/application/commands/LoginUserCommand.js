class LoginUserCommand {
    constructor({
      email,
      password,
    }) {
      this.email = email;
      this.password = password;
  
      Object.freeze(this);
    }
  }
  
  module.exports = LoginUserCommand;