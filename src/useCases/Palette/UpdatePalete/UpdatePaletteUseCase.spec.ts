import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import paletteRoutes from '@routes/paletteRoutes';
import updatePalette from '.';
import {
  IUpdatePaletteRequestBodyDTO,
  IUpdatePaletteRequestParamsDTO,
} from './UpdatePaletteDTO';
import UpdatePaletteUseCase from './UpdatePaletteUseCase';

const ownerId = '123';
const authorizedId = '123';
const unauthorizedId = '789';

const toChange: IUpdatePaletteRequestBodyDTO & IUpdatePaletteRequestParamsDTO = {
  isPublic: false,
  name: 'Paleta massa',
  authorizeChange: ['123', '456', '111213'],
  colors: [],
  membersId: ['123', '456'],
  paletteId: '200',
};

const palette = new Palette({
  isPublic: true,
  name: 'Paleta legal',
  authorizeChange: ['123', '456', '111213'],
  colors: [],
  membersId: ['123', '456'],
  ownerId,
}, '200');

describe('Testes de UpdatePalette', () => {
  const palettesRepository = (
    jest.createMockFromModule<IPalettesRepository>(
      '@repositories/implementations/MongoDBPalettesRepository',
    )
  );

  palettesRepository.updatePalette = jest
    .fn()
    .mockImplementation(async (modifiedPalette: Palette) => {
      expect(modifiedPalette.name).toEqual(toChange.name);
      expect(modifiedPalette.isPublic).toEqual(toChange.isPublic);
    });

  palettesRepository.getPaletteById = jest
    .fn()
    .mockImplementation(async (paletteId: string) => {
      if (paletteId !== palette._id) return null;

      return palette;
    });

  test('Testa se ao passar dados corretos atualiza a paleta.', async () => {
    const useCase = new UpdatePaletteUseCase(palettesRepository);
    await useCase.execute(toChange, authorizedId);

    expect(palettesRepository.getPaletteById).toHaveBeenCalled();
  });
});
