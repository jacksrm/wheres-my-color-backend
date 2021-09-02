import AuthenticateUserMiddleware from './AuthenticateUserMiddleware';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default function authenticateUser() {
  const useCase = new AuthenticateUserUseCase();
  const middleware = new AuthenticateUserMiddleware(useCase);

  return { useCase, middleware };
}
