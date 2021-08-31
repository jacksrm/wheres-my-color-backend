import User from '@entities/User';
import checkUserEncodedPassword from '.';
import EncodePasswordUseCase from '../EncodePassword/EncodePasswordUseCase';

const userData = {
  email: 'jacl@meuapp.com',
  password: '123456789',
  username: 'JackSR',
};

const user = new User(userData);
const encodePasswordUseCase = new EncodePasswordUseCase(user);

describe.skip('Testes de CheckEncodedPassword', () => {
  beforeEach(async () => {
    await encodePasswordUseCase.execute();
  });

  test('Deve retornar true quando a senha for correta', async () => {
    const verification = checkUserEncodedPassword(userData.password, user);

    expect(verification).toBeTruthy();
  });

  test('Deve retornar false quando a senha estiver incorreta.', async () => {
    const verification = checkUserEncodedPassword('abraCadabra', user);

    expect(verification).toBeFalsy();
  });
});
