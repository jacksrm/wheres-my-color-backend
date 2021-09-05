import GenerateUserTokenUseCase from './GenerateUserTokenUseCase';

export default function generateUserToken() {
  const useCase = new GenerateUserTokenUseCase();

  return useCase.execute;
}
