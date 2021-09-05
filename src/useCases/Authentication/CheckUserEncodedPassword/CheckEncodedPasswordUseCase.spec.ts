import { userCollection } from '@mocks/userCollection';
import { checkUserEncodedPasswordModule } from '.';
import { encodeUserPasswordModule } from '../EncodePassword';

const user = userCollection()[0];
const checkPass = checkUserEncodedPasswordModule();
const encodePass = encodeUserPasswordModule();

describe('Testes de CheckEncodedPassword', () => {
  beforeAll(async () => {
    await encodePass(user);
  });

  test('Deve retornar true quando a senha for correta', async () => {
    const verification = await checkPass(user, userCollection()[0].password);

    expect(verification).toBeTruthy();
  });

  test('Deve retornar false quando a senha estiver incorreta.', async () => {
    const verification = await checkPass(user, 'abraCadabra');

    expect(verification).toBeFalsy();
  });
});
