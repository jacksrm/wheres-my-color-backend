import User from '@entities/User';
import CheckEncodedPasswordUseCase from './CheckEncodedPasswordUseCase';

export default async function checkUserEncodedPassword(
  password: string,
  user: User,
) {
  const checkPass = new CheckEncodedPasswordUseCase(user);
  return checkPass.execute({ password });
}
