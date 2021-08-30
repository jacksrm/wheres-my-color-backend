import User from '@entities/User';
import EncodePasswordUseCase from './EncodePasswordUseCase';

describe.skip('Testa EnodePasswordUseCase.', () => {
  test('Verifica se o password foi encriptado.', async () => {
    const userData = {
      email: 'jacl@meuapp.com',
      password: '123456789',
      username: 'JackSR',
    };
    const user = new User(userData);
    const encodePasswordUseCase = new EncodePasswordUseCase(user);
    await encodePasswordUseCase.execute();

    expect(user.password).toMatch(/^\$2b\$/);
    expect(user.password).not.toEqual(userData.password);
  });
});
