import { repositoriesModule } from '@repositories/index';
import { IRepositoryFactory } from '@repositories/IRepositoryFactory';
import { UserLoginController } from './UserLoginController';
import { UserLoginUseCase } from './UserLoginUserCase';

const repos = repositoriesModule();

export function userLoginModule(repository: IRepositoryFactory = repos) {
  const useCase = new UserLoginUseCase(repository.users);
  const controller = new UserLoginController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle,
  };
}
