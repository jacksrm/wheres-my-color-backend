import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import CreatePaletteUseCase from './CreatePaletteUseCase';
import CreatePaletteController from './CreatePaletteController';

export default function createPalette() {
  const usersRepository = new MongoDBUsersRepository(UserModel);
  const palettesRepository = new MongoDBPalettesRepository(
    PaletteModel,
    usersRepository,
  );
  const useCase = new CreatePaletteUseCase(palettesRepository);
  const controller = new CreatePaletteController(useCase);

  return { useCase, controller };
}
