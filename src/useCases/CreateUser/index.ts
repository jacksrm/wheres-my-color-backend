import { model } from 'mongoose';
import MongoDBUsersRepository from 'repositories/implementations/MongoDBUsersRepository';
import UserSchema from 'repositories/schemas/UserSchema';
import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

const UserModel = model('User', UserSchema);

const mongoDBUsersRepository = new MongoDBUsersRepository(UserModel);
const createUserUseCase = new CreateUserUseCase(mongoDBUsersRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
