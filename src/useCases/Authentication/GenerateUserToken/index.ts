import GenerateUserTokenUseCase from './GenerateUserTokenUseCase';

export default function generateUserTokenModule() {
  const useCase = new GenerateUserTokenUseCase();

  return useCase.execute;
}
