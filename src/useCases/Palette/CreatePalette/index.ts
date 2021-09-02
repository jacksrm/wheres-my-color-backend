import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import CreatePaletteUseCase from './CreatePaletteUseCase';
import CreatePaletteController from './CreatePaletteController';

export default function createPalette() {
  const palettesRepository = new MongoDBPalettesRepository(PaletteModel);
  const useCase = new CreatePaletteUseCase(palettesRepository);
  const controller = new CreatePaletteController(useCase);

  return { useCase, controller };
}
