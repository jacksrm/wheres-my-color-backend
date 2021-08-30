import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import { UserModel } from '@repositories/schemas/UserSchema';
import GetSinglePaletteController from './GetSinglePaletteController';
import GetSinglePaletteUseCase from './GetSinglePaletteUseCase';

const paletteRepository = new MongoDBPalettesRepository(
  PaletteModel,
  new MongoDBUsersRepository(UserModel),
);

const getSinglePaletteUseCase = new GetSinglePaletteUseCase(paletteRepository);
const getSinglePaletteController = new GetSinglePaletteController(getSinglePaletteUseCase);

export { getSinglePaletteController, getSinglePaletteUseCase };
