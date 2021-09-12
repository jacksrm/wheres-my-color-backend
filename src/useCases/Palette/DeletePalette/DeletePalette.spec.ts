import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { deletePaletteModule } from '.';
import { DeletePaletteError } from './DeletePaletteError';

const PALETTE_NOT_FOUND_ERROR = new DeletePaletteError(
  404,
  "Couldn't find a palette with matching ID!",
);

const UNAUTHORIZED_ERROR = new DeletePaletteError(401, 'Unauthorized!');

const repos = mockRepos();
const deletePalette = deletePaletteModule(repos);
const palettes = paletteCollection();
const users = userCollection();

describe('Testes unitários de DeletePalette', () => {
  test('Deve remover a paleta caso passado o id da paleta e o id do dono da paleta', async () => {
    await expect(deletePalette.useCase({
      paletteId: palettes[0]._id,
      ownerId: users[0]._id,
    })).resolves.not.toThrow();
  });

  test(`Ao passar id inexistente deve lançar erro com a mensagem "${PALETTE_NOT_FOUND_ERROR.message}"`, async () => {
    await expect(deletePalette.useCase({
      paletteId: 'invalid id',
      ownerId: users[0]._id,
    })).rejects.toThrow(PALETTE_NOT_FOUND_ERROR);
  });

  test(`Ao passar ownerId não correspondente deve lançar erro com a mensagem "${UNAUTHORIZED_ERROR.message}"`, async () => {
    await expect(deletePalette.useCase({
      paletteId: palettes[0]._id,
      ownerId: users[1]._id,
    })).rejects.toThrow(UNAUTHORIZED_ERROR);
  });
});
