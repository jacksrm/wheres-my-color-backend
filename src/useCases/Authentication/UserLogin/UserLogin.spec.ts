import 'dotenv/config';
import { mockRepos } from '@mocks/index';
import { invalidLoginEmail, invalidLoginPass, validLoginData } from '@mocks/userCollection';
import { UserLoginUseCase } from './UserLoginUserCase';

const repos = mockRepos();

describe('Testes unitários de UserLogin.', () => {
  test('Ao passar dados de login válidos, deve ser retornado o token de acesso', async () => {
    const useCase = new UserLoginUseCase(repos.users);

    await expect(useCase.execute(validLoginData)).resolves.not.toThrow();
  });

  test('Ao passar email inválidos, deve ser lançado um erro com a mensagem "Theres no user with this email!"', async () => {
    const useCase = new UserLoginUseCase(repos.users);

    await expect(useCase.execute(invalidLoginEmail))
      .rejects
      .toThrowError(new Error('Theres no user with this email!'));
  });

  test('Ao passar senha inválida, deve ser lançado um erro com a mensagem "Incorrect password!"', async () => {
    const useCase = new UserLoginUseCase(repos.users);

    await expect(useCase.execute(invalidLoginPass))
      .rejects
      .toThrowError(new Error('Incorrect password!'));
  });
});
