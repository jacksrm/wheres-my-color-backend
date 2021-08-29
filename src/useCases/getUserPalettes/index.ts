import MongoDBPalettesRepositories from '@repositories/implementations/MongoDBPalettesRepositories';
import PaletteSchema from '@repositories/schemas/PaletteSchema';
import { model } from 'mongoose';
import GetUserPalettesController from './GetUserPalettesController';
import GetUserPalettesUseCase from './GetUserPalettesUseCase';

const PaletteModel = model('Palette', PaletteSchema);

const paletteRepository = new MongoDBPalettesRepositories(PaletteModel);
const getUserPalettesUseCase = new GetUserPalettesUseCase(paletteRepository);
const getUserPaletteController = new GetUserPalettesController(getUserPalettesUseCase);

export { getUserPalettesUseCase, getUserPaletteController };
