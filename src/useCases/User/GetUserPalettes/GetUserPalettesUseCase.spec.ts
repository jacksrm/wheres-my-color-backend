import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { getUserPalettesModule } from '.';

const repos = mockRepos();
const getUser = getUserPalettesModule(repos);
describe('Testes de GetUserPalette', () => {
  test('Testa se ao passar um id as paletas do usuário são retornadas', async () => {
    const idToFind = userCollection()[0]._id;
    const matched = await getUser.useCase({ ownerId: idToFind });

    matched.forEach((paletteFound) => {
      const check = paletteCollection().some(
        (paletteStored) => paletteStored._id === paletteFound._id,
      );

      expect(check).toBeTruthy();
    });
  });
});
