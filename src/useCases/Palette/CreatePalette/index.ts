import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import MongoDBUsersRepository from '@repositories/implementations/MongoDBUsersRepository';
import { UserModel } from '@repositories/schemas/UserSchema';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import CreatePaletteUseCase from './CreatePaletteUseCase';
import CreatePaletteController from './CreatePaletteController';

const usersRepository = new MongoDBUsersRepository(UserModel);
const palettesRepository = new MongoDBPalettesRepository(
  PaletteModel,
  usersRepository,
);
const createPaletteUseCase = new CreatePaletteUseCase(palettesRepository);
const createPaletteController = new CreatePaletteController(createPaletteUseCase);

export { createPaletteUseCase, createPaletteController };