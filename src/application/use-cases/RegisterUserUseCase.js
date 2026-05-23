class RegisterUserUseCase {
    constructor(userFactory, userRepository) {
      this.userFactory = userFactory;
      this.userRepository = userRepository;
    }
  
    async execute(dto) {
      const user = await this.userFactory.create(dto);
  
      await this.userRepository.save(user);
  
      return user;
    }
  }
  
  module.exports = RegisterUserUseCase;