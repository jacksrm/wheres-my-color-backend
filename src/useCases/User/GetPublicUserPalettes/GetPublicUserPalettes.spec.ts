import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { GetPublicUserPalettesUseCase } from './GetPublicUserPalettesUseCase';

const repos = mockRepos();
const userToFind = userCollection()[0];
const palettes = paletteCollection().filter(
  (palette) => palette.ownerId === userToFind._id && palette.isPublic,
);

describe('Testes de GetPublicUserPalettes.', () => {
  test('Testa se ao passar o id do dono, suas paletas públicas são retornadas', async () => {
    const useCase = new GetPublicUserPalettesUseCase(repos.palettes);
    const match = await useCase.execute({ ownerId: userToFind._id });
    expect(match).toEqual(palettes);
  });
});
