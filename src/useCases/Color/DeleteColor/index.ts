import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { DeleteColorController } from './DeleteColorController';
import { DeleteColorUseCase } from './DeleteColorUseCase';

const repos = repositoriesModule();

export function deleteColorModule(repository: IRepositoryFactory = repos) {
  const useCase = new DeleteColorUseCase(
    repository.colors,
    repository.palettes,
  );
  const controller = new DeleteColorController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
