import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { UpdateColorController } from './UpdateColorController';
import { UpdateColorUseCase } from './UpdateColorUseCase';

const repos = repositoriesModule();

export function updateColorModule(repository: IRepositoryFactory = repos) {
  const useCase = new UpdateColorUseCase(
    repository.colors,
    repository.palettes,
  );
  const controller = new UpdateColorController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
