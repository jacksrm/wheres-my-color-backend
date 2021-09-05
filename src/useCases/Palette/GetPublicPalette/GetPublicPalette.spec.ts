import { mockRepos } from '@mocks/index';
import {
  paletteCollection,
  privatePaletteId,
  publicPaletteId,
} from '@mocks/paletteCollection';
import { GetPublicPaletteUseCase } from './GetPublicPaletteUseCase';

const repos = mockRepos();
const palettes = paletteCollection();

describe('Testes unitários de GetPublicPalette', () => {
  test('Deve retornar a paleta pública quando passado um id de paleta pública ', async () => {
    const useCase = new GetPublicPaletteUseCase(repos.palettes);

    await expect(useCase.execute({ paletteId: publicPaletteId }))
      .resolves
      .toEqual(palettes[0]);
  });

  test('Deve lançar exceção ao tentar recuperar paleta privada.', async () => {
    const useCase = new GetPublicPaletteUseCase(repos.palettes);

    await expect(useCase.execute({ paletteId: privatePaletteId }))
      .rejects
      .toThrowError(new Error("This palette doesn't exists!"));
  });
});
