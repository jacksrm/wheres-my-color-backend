import { mockRepos } from '@mocks/index';
import { changePaletteData } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { updatePaletteModule } from '.';

import { UpdatePaletteError } from './UpdatePaletteError';

const repos = mockRepos();
const users = userCollection();
const updatePalette = updatePaletteModule(repos);

describe('Testes de UpdatePalette', () => {
  test('Ao passar dados corretos atualiza a paleta.', async () => {
    const newPalette = await updatePalette.useCase(changePaletteData, users[0]._id);

    expect(newPalette).toBeDefined();
    if (newPalette) expect(newPalette.name).toEqual(changePaletteData.name);
  });

  test('Ao passar o ID do user não autorizado retorna um erro com a mensagem "Unauthorized!', async () => {
    await expect(updatePalette.useCase(changePaletteData, users[1]._id))
      .rejects
      .toThrow(new UpdatePaletteError(401, 'Unauthorized!'));
  });

  test('Ao passar o ID da paleta inválido retorna um erro com a mensagem "Can\'t update this palette!"!', async () => {
    changePaletteData.paletteId = 'id inválido';
    await expect(updatePalette.useCase(changePaletteData, users[0]._id))
      .rejects
      .toThrow(new UpdatePaletteError(404, "Can't update this palette!"));
  });
});

describe('Testes de Integração de UpdatePalette', () => {

});
