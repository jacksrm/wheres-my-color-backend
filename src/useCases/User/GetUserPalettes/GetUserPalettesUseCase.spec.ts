import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { GetUserPalettesUseCase } from './GetUserPalettesUseCase';

const repos = mockRepos();

describe('Testes de GetUserPalette', () => {
  test('Testa se ao passar um id as paletas do usuário são retornadas', async () => {
    const useCase = new GetUserPalettesUseCase(repos.palettes);
    const idToFind = userCollection()[0]._id;
    const matched = await useCase.execute({ ownerId: idToFind });

    matched.forEach((paletteFound) => {
      const check = paletteCollection().some(
        (paletteStored) => paletteStored._id === paletteFound._id,
      );

      expect(check).toBeTruthy();
    });
  });
});
