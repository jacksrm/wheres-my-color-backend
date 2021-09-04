import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import {
  IUpdatePaletteRequestBodyDTO,
  IUpdatePaletteRequestParamsDTO,
} from './UpdatePaletteDTO';
import UpdatePaletteError from './UpdatePaletteError';
import UpdatePaletteUseCase from './UpdatePaletteUseCase';

const ownerId = '123';
const authorizedId = '123';
const unauthorizedId = '789';

const toChange: IUpdatePaletteRequestBodyDTO & IUpdatePaletteRequestParamsDTO = (
  {
    isPublic: false,
    name: 'Paleta massa',
    authorizeChange: ['123', '456', '111213'],
    colors: [],
    membersId: ['123', '456'],
    paletteId: '200',
  }
);
const palette = new Palette(
  {
    isPublic: true,
    name: 'Paleta legal',
    authorizeChange: ['123', '456', '111213'],
    colors: [],
    membersId: ['123', '456'],
    ownerId,
  },
  '200',
);

describe('Testes de UpdatePalette', () => {
  const palettesRepository = jest.createMockFromModule<IPalettesRepository>(
    '@repositories/implementations/MongoDBPalettesRepository',
  );
  beforeEach(() => {
    jest.clearAllMocks();

    palettesRepository.updatePalette = jest
      .fn()
      .mockImplementation(async (modifiedPalette: Palette) => {
        console.log('Original Palette', palette);
        console.log('Modified Palette', modifiedPalette);
        expect(modifiedPalette.name).toEqual(toChange.name);
        expect(modifiedPalette.isPublic).toEqual(toChange.isPublic);
      });

    palettesRepository.getPaletteById = jest
      .fn()
      .mockImplementation(async (paletteId: string) => {
        if (paletteId !== palette._id) return null;

        return palette;
      });
  });

  test('Ao passar dados corretos atualiza a paleta.', async () => {
    const useCase = new UpdatePaletteUseCase(palettesRepository);
    await useCase.execute(toChange, authorizedId);

    expect(palettesRepository.getPaletteById).toHaveBeenCalled();
  });

  test('Ao passar o ID do user não autorizado retorna um erro', async () => {
    const useCase = new UpdatePaletteUseCase(palettesRepository);

    await expect(useCase.execute(toChange, unauthorizedId))
      .rejects
      .toThrow(new UpdatePaletteError(401, 'Unauthorized!'));
  });

  test('should ', async () => {
    const useCase = new UpdatePaletteUseCase(palettesRepository);
    toChange.paletteId = 'id inválido';
    await expect(useCase.execute(toChange, unauthorizedId))
      .rejects
      .toThrow(new UpdatePaletteError(404, "Can't update this palette!"));
  });
});
