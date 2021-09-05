import { mockRepos } from '@mocks/index';
import { userCollection } from '@mocks/userCollection';
import { GetUserUseCase } from './GetUserUseCase';

const repos = mockRepos();
const userToFind = userCollection()[0];

describe('Testes de GetUser.', () => {
  test('Testa se ao passar o id do usuário, seus dados são retornados, exceto password', async () => {
    const useCase = new GetUserUseCase(repos.users);
    const match = await useCase.execute({ userId: userToFind._id });
    const { password, ...toCheck } = userToFind;
    expect(match).toEqual(toCheck);
  });
});
