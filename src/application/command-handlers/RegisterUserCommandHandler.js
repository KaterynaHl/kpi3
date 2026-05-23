class RegisterUserCommandHandler {
    constructor(userFactory, userRepository) {
      this.userFactory = userFactory;
      this.userRepository = userRepository;
    }
  
    async handle(command) {
      const user = await this.userFactory.create(command);
      await this.userRepository.save(user);
  
      return user.id;
    }
  }
  
  module.exports = RegisterUserCommandHandler;