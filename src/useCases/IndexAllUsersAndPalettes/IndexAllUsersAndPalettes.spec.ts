import { mockRepos } from '@mocks/index';
import { indexAllUsersAndPalettesModule } from '.';

const repos = mockRepos();
const indexAll = indexAllUsersAndPalettesModule(repos);

describe('Testes de IndexAllUsersAndPalettesUseCase', () => {
  test('Deve retornar um array de usuários com suas devidas paletas publicas', async () => {
    const usersWithPalettes = await indexAll.useCase();

    expect(usersWithPalettes).toHaveLength(2);

    usersWithPalettes.forEach((user) => {
      expect(user.palettes).toHaveLength(2);

      user.palettes.forEach((palette) => {
        expect(palette.isPublic).toBeTruthy();
      });
    });
  });
});
