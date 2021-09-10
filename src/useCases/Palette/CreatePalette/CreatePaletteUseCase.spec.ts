import { mockRepos } from '@mocks/index';
import { createPaletteData } from '@mocks/paletteCollection';
import { createPaletteModule } from '.';

const repos = mockRepos();
const createPalette = createPaletteModule(repos);

describe('Testes de CreatePalette.', () => {
  test('Testa se ao passar os dados da paleta, a paleta é criada', async () => {
    const newPalette = await createPalette.useCase(createPaletteData);

    expect(newPalette).toBeDefined();
    expect(newPalette._id).toBeDefined();
    expect(newPalette.authorizeChange).toEqual([newPalette.ownerId]);
    expect(newPalette.membersId).toEqual([newPalette.ownerId]);
  });
});
