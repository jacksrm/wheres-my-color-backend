import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import GetSingleUserController from './GetSingleUserController';
import GetSingleUserUseCase from './GetSingleUserUseCase';

export default function getSingleUser() {
  const usersRepository = new MongoDBUsersRepository(UserModel);
  const useCase = new GetSingleUserUseCase(usersRepository);
  const controller = new GetSingleUserController(useCase);

  return { useCase, controller };
}
