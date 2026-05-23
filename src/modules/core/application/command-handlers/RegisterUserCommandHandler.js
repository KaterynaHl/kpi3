class RegisterUserCommandHandler {
    constructor(userFactory, userRepository) {
      this.userFactory = userFactory;
      this.userRepository = userRepository;
    }
  
    async handle(command) {
      const user = await this.userFactory.create({
        username: command.username,
        email: command.email,
        password: command.password,
      });
  
      await this.userRepository.save(user);
  
      return { userId: user.id };
    }
  }
  
  module.exports = RegisterUserCommandHandler;