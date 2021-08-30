import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import GetSingleUserController from './GetSingleUserController';
import GetSingleUserUseCase from './GetSingleUserUseCase';

const usersRepository = new MongoDBUsersRepository(UserModel);
const getSingleUserUseCase = new GetSingleUserUseCase(usersRepository);
const getSingleUserController = new GetSingleUserController(getSingleUserUseCase);

export { getSingleUserUseCase, getSingleUserController };
