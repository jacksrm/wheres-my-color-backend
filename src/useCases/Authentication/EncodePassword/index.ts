import EncodePasswordUseCase from './EncodePasswordUseCase';

export default function encodeUserPasswordModule() {
  const useCase = new EncodePasswordUseCase();
  return useCase.execute;
}
