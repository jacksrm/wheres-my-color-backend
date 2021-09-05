import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

export default function createUserModule() {
  const mongoDBUsersRepository = new MongoDBUsersRepository(UserModel);
  const useCase = new CreateUserUseCase(mongoDBUsersRepository);
  const controller = new CreateUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
