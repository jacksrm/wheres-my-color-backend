import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import UpdatePaletteController from './UpdatePaletteController';
import UpdatePaletteUseCase from './UpdatePaletteUseCase';

export default function updatePalette() {
  const palettesRepository = new MongoDBPalettesRepository(PaletteModel);
  const useCase = new UpdatePaletteUseCase(palettesRepository);
  const controller = new UpdatePaletteController(useCase);

  return { useCase, controller };
}
