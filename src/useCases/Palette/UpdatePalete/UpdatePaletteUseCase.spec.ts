import { mockRepos } from '@mocks/index';
import { changePaletteData } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';

import { UpdatePaletteError } from './UpdatePaletteError';
import { UpdatePaletteUseCase } from './UpdatePaletteUseCase';

const repos = mockRepos();
const users = userCollection();

describe('Testes de UpdatePalette', () => {
  test('Ao passar dados corretos atualiza a paleta.', async () => {
    const useCase = new UpdatePaletteUseCase(repos.palettes);
    const newPalette = await useCase.execute(changePaletteData, users[0]._id);

    expect(newPalette).toBeDefined();
    if (newPalette) expect(newPalette.name).toEqual(changePaletteData.name);
  });

  test('Ao passar o ID do user não autorizado retorna um erro com a mensagem "Unauthorized!', async () => {
    const useCase = new UpdatePaletteUseCase(repos.palettes);

    await expect(useCase.execute(changePaletteData, users[1]._id))
      .rejects
      .toThrow(new UpdatePaletteError(401, 'Unauthorized!'));
  });

  test('Ao passar o ID da paleta inválido retorna um erro com a mensagem "Can\'t update this palette!"!', async () => {
    const useCase = new UpdatePaletteUseCase(repos.palettes);
    changePaletteData.paletteId = 'id inválido';
    await expect(useCase.execute(changePaletteData, users[0]._id))
      .rejects
      .toThrow(new UpdatePaletteError(404, "Can't update this palette!"));
  });
});
