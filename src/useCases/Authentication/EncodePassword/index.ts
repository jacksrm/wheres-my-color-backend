import EncodePasswordUseCase from './EncodePasswordUseCase';

export default function encodeUserPassword() {
  const useCase = new EncodePasswordUseCase();
  return useCase.execute;
}
