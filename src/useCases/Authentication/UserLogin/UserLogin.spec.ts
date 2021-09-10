import 'dotenv/config';
import { mockRepos } from '@mocks/index';
import { invalidLoginEmail, invalidLoginPass, validLoginData } from '@mocks/userCollection';
import { userLoginModule } from '.';

const repos = mockRepos();
const userLogin = userLoginModule(repos);

describe('Testes unitários de UserLogin.', () => {
  test('Ao passar dados de login válidos, deve ser retornado o token de acesso', async () => {
    await expect(userLogin.useCase(validLoginData)).resolves.not.toThrow();
  });

  test('Ao passar email inválidos, deve ser lançado um erro com a mensagem "Theres no user with this email!"', async () => {
    await expect(userLogin.useCase(invalidLoginEmail))
      .rejects
      .toThrowError(new Error('Theres no user with this email!'));
  });

  test('Ao passar senha inválida, deve ser lançado um erro com a mensagem "Incorrect password!"', async () => {
    await expect(userLogin.useCase(invalidLoginPass))
      .rejects
      .toThrowError(new Error('Incorrect password!'));
  });
});
