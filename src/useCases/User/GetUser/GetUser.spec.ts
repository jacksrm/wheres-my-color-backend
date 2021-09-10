import { mockRepos } from '@mocks/index';
import { userCollection } from '@mocks/userCollection';
import { getUserModule } from '.';

const repos = mockRepos();
const getUser = getUserModule(repos);
const userToFind = userCollection()[0];

describe('Testes de GetUser.', () => {
  test('Testa se ao passar o id do usuário, seus dados são retornados, exceto password', async () => {
    const match = await getUser.useCase({ userId: userToFind._id });
    const { password, ...toCheck } = userToFind;
    expect(match).toEqual(toCheck);
  });
});
