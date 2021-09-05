import { GenerateUserTokenUseCase } from './GenerateUserTokenUseCase';

export function generateUserTokenModule() {
  const useCase = new GenerateUserTokenUseCase();

  return useCase.execute;
}
