import { UsersRepository } from '@mocks/UsersRepository';
import { PalettesRepository } from '@mocks/PalettesRepository';
import { IndexAllUsersAndPalettesUseCase } from './IndexAllUsersAndPalettesUseCase';

const usersRepo = new UsersRepository();
const palettesRepo = new PalettesRepository();
const useCase = new IndexAllUsersAndPalettesUseCase(usersRepo, palettesRepo);

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
