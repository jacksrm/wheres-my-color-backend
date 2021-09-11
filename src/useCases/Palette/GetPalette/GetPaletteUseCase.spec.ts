import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { getPaletteModule } from '.';

const repos = mockRepos();
const getPalette = getPaletteModule(repos);

describe('Testes de GetSinglePalette', () => {
  test('Testa se ao passar o id da paleta, a paleta é retornada', async () => {
    const palette = await getPalette.useCase({ paletteId: paletteCollection()[0]._id });

    expect(palette).toBeDefined();
  });

  test('Testa se ao passar o id inválido da paleta, um erro é lançado coma mensagem "This palette doesn\'t exists!"', async () => {
    await expect(getPalette.useCase({ paletteId: 'Um id qualquer inválido' }))
      .rejects
      .toThrowError(new Error("This palette doesn't exists!"));
  });
});
