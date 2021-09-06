import { userCollection } from '@mocks/userCollection';
import { encodeUserPasswordModule } from '.';

const encodePass = encodeUserPasswordModule();

describe.skip('Testa EnodePasswordUseCase.', () => {
  test('Verifica se o password foi encriptado.', async () => {
    const user = userCollection()[0];
    await encodePass(user);

    expect(user.password).toMatch(/^\$2b\$/);
    expect(user.password).not.toEqual(userCollection()[0].password);
  });
});
