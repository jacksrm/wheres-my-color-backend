import User from '@entities/User';
import encodeUserPassword from '.';

describe.skip('Testa EnodePasswordUseCase.', () => {
  test('Verifica se o password foi encriptado.', async () => {
    const userData = {
      email: 'jacl@meuapp.com',
      password: '123456789',
      username: 'JackSR',
    };
    const user = new User(userData);
    await encodeUserPassword(user);

    expect(user.password).toMatch(/^\$2b\$/);
    expect(user.password).not.toEqual(userData.password);
  });
});
