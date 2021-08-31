import User from '@entities/User';
import EncodePasswordUseCase from './EncodePasswordUseCase';

export default async function encodeUserPassword(user: User) {
  const encodePasswordUseCase = new EncodePasswordUseCase(user);
  await encodePasswordUseCase.execute();
}
