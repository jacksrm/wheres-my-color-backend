import { UserModel } from '@repositories/schemas/UserSchema';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import GetUserPalettesController from './GetUserPalettesController';
import GetUserPalettesUseCase from './GetUserPalettesUseCase';

export default function getUserPalettes() {
  const usersRepository = new MongoDBUsersRepository(UserModel);
  const palettesRepository = new MongoDBPalettesRepository(PaletteModel, usersRepository);
  const useCase = new GetUserPalettesUseCase(palettesRepository);
  const controller = new GetUserPalettesController(useCase);

  return { useCase, controller };
}
