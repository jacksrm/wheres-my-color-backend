import { EncodePasswordUseCase } from './EncodePasswordUseCase';

export function encodeUserPasswordModule() {
  const useCase = new EncodePasswordUseCase();
  return useCase.execute;
}
