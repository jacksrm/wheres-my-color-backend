import { CheckEncodedPasswordUseCase } from './CheckEncodedPasswordUseCase';

export function checkUserEncodedPasswordModule() {
  const checkPass = new CheckEncodedPasswordUseCase();
  return checkPass.execute;
}
