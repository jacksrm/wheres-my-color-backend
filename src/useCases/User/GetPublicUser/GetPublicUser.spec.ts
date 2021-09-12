import { mockRepos } from '@mocks/index';
import { userCollection } from '@mocks/userCollection';
import { getPublicUserModule } from '.';

const repos = mockRepos();
const getUser = getPublicUserModule(repos);
const userToFind = userCollection()[0];

describe('Testes de GetUser.', () => {
  test('Testa se ao passar o id do usuário, seus dados são retornados, exceto password', async () => {
    const match = await getUser.useCase({ userId: userToFind._id });
    const { password, email, ...toCheck } = userToFind;
    expect(match).toEqual(toCheck);
  });
});
