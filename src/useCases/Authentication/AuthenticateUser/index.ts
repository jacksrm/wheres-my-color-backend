import AuthenticateUserMiddleware from './AuthenticateUserMiddleware';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

const authenticateUserUseCase = new AuthenticateUserUseCase();
const authenticateUserMiddleware = new AuthenticateUserMiddleware(
  authenticateUserUseCase,
);

export { authenticateUserUseCase, authenticateUserMiddleware };
