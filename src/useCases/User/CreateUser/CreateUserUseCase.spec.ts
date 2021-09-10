import { mockRepos } from '@mocks/index';
import {
  newUserData,
  conflictEmailUserData,
  conflictUsernameUserData,
} from '@mocks/userCollection';
import { createUserModule } from '.';

const repos = mockRepos();
const createUser = createUserModule(repos);

describe('Testes de CreateUserUseCase.', () => {
  test('testa se ao passar os dados do usuário, um novo registro é criado', async () => {
    const newUser = await createUser.useCase(newUserData);

    expect(newUser).toBeDefined();
    expect(newUser._id).toBeDefined();
  });

  test('testa se ao passar email conflitante, lança uma exceção com a mensagem "Email already registered!!"', async () => {
    await expect(createUser.useCase(conflictEmailUserData)).rejects.toThrow(
      new Error('Email already registered!!'),
    );
  });

  test('testa se ao passar username conflitante, lança uma exceção com a mensagem "Username already registered!!"', async () => {
    await expect(createUser.useCase(conflictUsernameUserData)).rejects.toThrow(
      new Error('Username already registered!!'),
    );
  });
});
