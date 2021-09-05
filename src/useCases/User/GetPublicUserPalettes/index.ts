import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import { GetPublicUserPalettesUseCase } from './GetPublicUserPalettesUseCase';
import { GetPublicUserPalettesController } from './GetPublicUserPalettesController';

export function getPublicUserPalettesModule() {
  const palettesRepository = new MongoDBPalettesRepository(PaletteModel);
  const useCase = new GetPublicUserPalettesUseCase(palettesRepository);
  const controller = new GetPublicUserPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
