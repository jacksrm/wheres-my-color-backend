import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import { GetUserController } from './GetUserController';
import { GetUserUseCase } from './GetUserUseCase';

export function getUserModule() {
  const usersRepository = new MongoDBUsersRepository(UserModel);
  const useCase = new GetUserUseCase(usersRepository);
  const controller = new GetUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
