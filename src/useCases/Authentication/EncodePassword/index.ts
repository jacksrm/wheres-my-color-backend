import User from '@entities/User';
import EncodePasswordUseCase from './EncodePasswordUseCase';

export default async function encodeUserPassword(user: User) {
  const encodePasswordUseCase = new EncodePasswordUseCase();
  await encodePasswordUseCase.execute(user);
}
