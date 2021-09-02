import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import GetPublicPaletteController from './GetPublicPaletteController';
import GetPublicPaletteUseCase from './GetPublicPaletteUseCase';

export default function getPublicPalette() {
  const paletteRepository = new MongoDBPalettesRepository(PaletteModel);
  const useCase = new GetPublicPaletteUseCase(paletteRepository);
  const controller = new GetPublicPaletteController(useCase);

  return { useCase, controller };
}
