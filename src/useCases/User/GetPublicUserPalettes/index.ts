import { repositoriesModule } from '@repositories/index';
import { GetPublicUserPalettesUseCase } from './GetPublicUserPalettesUseCase';
import { GetPublicUserPalettesController } from './GetPublicUserPalettesController';

const repos = repositoriesModule();

export function getPublicUserPalettesModule() {
  const useCase = new GetPublicUserPalettesUseCase(repos.palettes);
  const controller = new GetPublicUserPalettesController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
