import User from '@entities/User';
import EncodePasswordUseCase from '../EncodePassword/EncodePasswordUseCase';
import CheckEncodedPasswordUseCase from './CheckEncodedPasswordUseCase';

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
    const checkPass = new CheckEncodedPasswordUseCase(user);

    const verification = await checkPass.execute({ password: userData.password });

    expect(verification).toBeTruthy();
  });

  test('Deve retornar false quando a senha estiver incorreta.', async () => {
    const checkPass = new CheckEncodedPasswordUseCase(user);

    const verification = await checkPass.execute({ password: 'abraCadabra' });

    expect(verification).toBeFalsy();
  });
});
