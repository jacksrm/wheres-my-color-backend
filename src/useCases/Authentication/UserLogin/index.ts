import { repositoriesModule } from '@repositories/index';
import { UserLoginController } from './UserLoginController';
import { UserLoginUseCase } from './UserLoginUserCase';

const repos = repositoriesModule();

export function userLoginModule() {
  const useCase = new UserLoginUseCase(repos.users);
  const controller = new UserLoginController(useCase);

  return {
    useCase: useCase.execute,
    controller: controller.handle(),
  };
}
