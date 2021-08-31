import User from '@entities/User';
import GenerateUserTokenUseCase from './GenerateUserTokenUseCase';

export default function generateUserToken(user: User) {
  const generateUserTokenUseCase = new GenerateUserTokenUseCase();

  return generateUserTokenUseCase.execute(user);
}
