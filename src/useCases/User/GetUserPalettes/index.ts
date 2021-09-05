import { PaletteModel } from '@repositories/schemas/PaletteSchema';
import MongoDBPalettesRepository from '@repositories/implementations/MongoDBPalettesRepository';
import { GetUserPalettesController } from './GetUserPalettesController';
import { GetUserPalettesUseCase } from './GetUserPalettesUseCase';

export function getUserPalettesModule() {
  const palettesRepository = new MongoDBPalettesRepository(PaletteModel);
  const useCase = new GetUserPalettesUseCase(palettesRepository);
  const controller = new GetUserPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
