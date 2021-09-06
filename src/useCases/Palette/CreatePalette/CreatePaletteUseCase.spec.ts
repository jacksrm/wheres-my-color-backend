import { mockRepos } from '@mocks/index';
import { createPaletteData } from '@mocks/paletteCollection';
import { CreatePaletteUseCase } from './CreatePaletteUseCase';

const repos = mockRepos();

describe('Testes de CreatePalette.', () => {
  test('Testa se ao passar os dados da paleta, a paleta é criada', async () => {
    const useCase = new CreatePaletteUseCase(repos.palettes);
    const newPalette = await useCase.execute(createPaletteData);

    expect(newPalette).toBeDefined();
    expect(newPalette._id).toBeDefined();
    expect(newPalette.authorizeChange).toEqual([newPalette.ownerId]);
    expect(newPalette.membersId).toEqual([newPalette.ownerId]);
  });
});
