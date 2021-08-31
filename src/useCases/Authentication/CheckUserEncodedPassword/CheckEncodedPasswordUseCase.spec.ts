import User from '@entities/User';
import checkUserEncodedPassword from '.';
import EncodePasswordUseCase from '../EncodePassword/EncodePasswordUseCase';

const userData = {
  email: 'jacl@meuapp.com',
  password: '123456789',
  username: 'JackSR',
};

const user = new User(userData);
const encodePasswordUseCase = new EncodePasswordUseCase();

describe.skip('Testes de CheckEncodedPassword', () => {
  beforeAll(async () => {
    await encodePasswordUseCase.execute(user);
  });

  test('Deve retornar true quando a senha for correta', async () => {
    const verification = await checkUserEncodedPassword(user, userData.password);

    expect(verification).toBeTruthy();
  });

  test('Deve retornar false quando a senha estiver incorreta.', async () => {
    const verification = await checkUserEncodedPassword(user, 'abraCadabra');

    expect(verification).toBeFalsy();
  });
});
