import { UserModel } from '@repositories/schemas/UserSchema';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import GetUserPalettesController from './GetUserPalettesController';
import GetUserPalettesUseCase from './GetUserPalettesUseCase';

const usersRepository = new MongoDBUsersRepository(UserModel);
const palettesRepository = new MongoDBPalettesRepository(PaletteModel, usersRepository);
const getUserPalettesUseCase = new GetUserPalettesUseCase(palettesRepository);
const getUserPalettesController = new GetUserPalettesController(getUserPalettesUseCase);

export { getUserPalettesUseCase, getUserPalettesController };
