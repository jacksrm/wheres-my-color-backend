import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import GetPaletteController from './GetPaletteController';
import GetPaletteUseCase from './GetPaletteUseCase';

export default function getPalette() {
  const paletteRepository = new MongoDBPalettesRepository(PaletteModel);

  const useCase = new GetPaletteUseCase(paletteRepository);
  const controller = new GetPaletteController(useCase);

  return { controller, useCase };
}
