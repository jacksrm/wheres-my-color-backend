import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

const mongoDBUsersRepository = new MongoDBUsersRepository(UserModel);
const createUserUseCase = new CreateUserUseCase(mongoDBUsersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
