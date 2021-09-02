import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import { UserModel } from '@repositories/schemas/UserSchema';
import GetSinglePaletteController from './GetSinglePaletteController';
import GetSinglePaletteUseCase from './GetSinglePaletteUseCase';

export default function getSinglePalette() {
  const paletteRepository = new MongoDBPalettesRepository(
    PaletteModel,
    new MongoDBUsersRepository(UserModel),
  );

  const useCase = new GetSinglePaletteUseCase(paletteRepository);
  const controller = new GetSinglePaletteController(useCase);

  return { controller, useCase };
}
