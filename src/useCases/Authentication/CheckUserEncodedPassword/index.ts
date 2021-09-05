import CheckEncodedPasswordUseCase from './CheckEncodedPasswordUseCase';

export default function checkUserEncodedPasswordModule() {
  const checkPass = new CheckEncodedPasswordUseCase();
  return checkPass.execute;
}
