import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { GetPaletteUseCase } from './GetPaletteUseCase';

const repos = mockRepos();

describe('Testes de GetSinglePalette', () => {
  test('Testa se ao passar o id da paleta, a paleta é retornada', async () => {
    const useCase = new GetPaletteUseCase(repos.palettes);
    const palette = await useCase.execute({ paletteId: paletteCollection()[0]._id });

    expect(palette).toBeDefined();
  });

  test('Testa se ao passar o id inválido da paleta, um erro é lançado coma mensagem "This palette doesn\'t exists!"', async () => {
    const useCase = new GetPaletteUseCase(repos.palettes);

    await expect(useCase.execute({ paletteId: 'Um id qualquer inválido' }))
      .rejects
      .toThrowError(new Error("This palette doesn't exists!"));
  });
});
