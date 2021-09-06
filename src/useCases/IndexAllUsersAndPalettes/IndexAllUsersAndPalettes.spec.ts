import { mockRepos } from '@mocks/index';
import { IndexAllUsersAndPalettesUseCase } from './IndexAllUsersAndPalettesUseCase';

const repos = mockRepos();
const useCase = new IndexAllUsersAndPalettesUseCase(repos.users, repos.palettes);

describe('Testes de IndexAllUsersAndPalettesUseCase', () => {
  test('Deve retornar um array de usuários com suas devidas paletas publicas', async () => {
    const usersWithPalettes = await useCase.execute();

    expect(usersWithPalettes).toHaveLength(2);

    usersWithPalettes.forEach((user) => {
      expect(user.palettes).toHaveLength(2);

      user.palettes.forEach((palette) => {
        expect(palette.isPublic).toBeTruthy();
      });
    });
  });
});
