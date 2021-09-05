import CheckEncodedPasswordUseCase from './CheckEncodedPasswordUseCase';

export default function checkUserEncodedPassword() {
  const checkPass = new CheckEncodedPasswordUseCase();
  return checkPass.execute;
}
