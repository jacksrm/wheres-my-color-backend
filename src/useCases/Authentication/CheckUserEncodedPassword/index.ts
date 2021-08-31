import User from '@entities/User';
import CheckEncodedPasswordUseCase from './CheckEncodedPasswordUseCase';

export default async function checkUserEncodedPassword(
  user: User,
  password: string,
) {
  const checkPass = new CheckEncodedPasswordUseCase();
  return checkPass.execute(user, password);
}
