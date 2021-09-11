import { mockRepos } from '@mocks/index';
import {
  paletteCollection,
  privatePaletteId,
  publicPaletteId,
} from '@mocks/paletteCollection';
import { getPublicPaletteModule } from '.';

const repos = mockRepos();
const palettes = paletteCollection();
const getPublicPalette = getPublicPaletteModule(repos);

describe('Testes unitários de GetPublicPalette', () => {
  test('Deve retornar a paleta pública quando passado um id de paleta pública ', async () => {
    await expect(getPublicPalette.useCase({ paletteId: publicPaletteId }))
      .resolves
      .toEqual(palettes[0]);
  });

  test('Deve lançar exceção ao tentar recuperar paleta privada.', async () => {
    await expect(getPublicPalette.useCase({ paletteId: privatePaletteId }))
      .rejects
      .toThrowError(new Error("This palette doesn't exists!"));
  });
});
