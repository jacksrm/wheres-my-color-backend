import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCase } from './DeleteUserUseCase';

const repos = repositoriesModule();

export function deleteUserModule(repository: IRepositoryFactory = repos) {
  const useCase = new DeleteUserUseCase(repository);
  const controller = new DeleteUserController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
