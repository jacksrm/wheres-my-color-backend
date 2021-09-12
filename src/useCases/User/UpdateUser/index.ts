import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';

const repos = repositoriesModule();

export function updateUserModule(repository: IRepositoryFactory = repos) {
  const useCase = new UpdateUserUseCase(repository.users);
  const controller = new UpdateUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
