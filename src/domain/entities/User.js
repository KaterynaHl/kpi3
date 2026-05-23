class User {
    constructor({ id, username, email, passwordHash }) {
      this._id = id;
      this._username = username;
      this._email = email;
      this._passwordHash = passwordHash;
    }
  
    get id() {
      return this._id;
    }
  
    get username() {
      return this._username.value;
    }
  
    get email() {
      return this._email.value;
    }
  
    get passwordHash() {
      return this._passwordHash;
    }
  }
  
  module.exports = User;