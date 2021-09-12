import { mockRepos } from '@mocks/index';
import { deleteUserModule } from '.';

const repos = mockRepos();
const deleteUser = deleteUserModule(repos);

describe('Testes unitários de DeleteUser', () => {
  test('Deve remover usuário caso seja passado o ID do usuário.', async () => {
  });
});
