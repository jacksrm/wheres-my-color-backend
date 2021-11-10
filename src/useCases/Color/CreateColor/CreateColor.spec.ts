import { colorToAdd } from '@mocks/colorCollection';
import { mockRepos } from '@mocks/index';
import { createColorModule } from '.';

const repos = mockRepos();
const create = createColorModule(repos);

jest.setTimeout(10000);

describe('Testes Unitários de CreateColor', () => {
  test('Deve criar uma paleta ao passar os dados necessários.', async () => {
    await expect(create.useCase({ ...colorToAdd, paletteId: 'palette111' }))
      .resolves
      .not
      .toThrow();
  });
});
