import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import UserLoginController from './UserLoginController';
import UserLoginUseCase from './UserLoginUserCase';

export default function userLogin() {
  const userRepository = new MongoDBUsersRepository(UserModel);
  const useCase = new UserLoginUseCase(userRepository);
  const controller = new UserLoginController(useCase);

  return { useCase: useCase.execute, controller: controller.handle };
}
