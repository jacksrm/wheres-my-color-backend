import AuthenticateUserMiddleware from './AuthenticateUserMiddleware';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default function authenticateUserModule() {
  const useCase = new AuthenticateUserUseCase();
  const middleware = new AuthenticateUserMiddleware(useCase);

  return {
    useCase: useCase.execute,
    middleware: middleware.handle(),
  };
}
