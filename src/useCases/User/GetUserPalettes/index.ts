import { repositoriesModule } from '@repositories/index';
import { GetUserPalettesController } from './GetUserPalettesController';
import { GetUserPalettesUseCase } from './GetUserPalettesUseCase';

const repos = repositoriesModule();

export function getUserPalettesModule() {
  const useCase = new GetUserPalettesUseCase(repos.palettes);
  const controller = new GetUserPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
