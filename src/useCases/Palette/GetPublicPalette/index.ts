import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import { GetPublicPaletteController } from './GetPublicPaletteController';
import { GetPublicPaletteUseCase } from './GetPublicPaletteUseCase';

export function getPublicPaletteModule() {
  const paletteRepository = new MongoDBPalettesRepository(PaletteModel);
  const useCase = new GetPublicPaletteUseCase(paletteRepository);
  const controller = new GetPublicPaletteController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
