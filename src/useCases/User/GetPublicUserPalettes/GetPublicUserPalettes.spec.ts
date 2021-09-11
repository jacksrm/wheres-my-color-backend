import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { getPublicUserPalettesModule } from '.';

const repos = mockRepos();
const getPublicUserPalettes = getPublicUserPalettesModule(repos);
const userToFind = userCollection()[0];
const palettes = paletteCollection().filter(
  (palette) => palette.ownerId === userToFind._id && palette.isPublic,
);

describe('Testes de GetPublicUserPalettes.', () => {
  test('Testa se ao passar o id do dono, suas paletas públicas são retornadas', async () => {
    const match = await getPublicUserPalettes.useCase({ ownerId: userToFind._id });
    expect(match).toEqual(palettes);
  });
});
