import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import GetPublicPaletteUseCase from './GetPublicPaletteUseCase';

const repository = jest.createMockFromModule<IPalettesRepository>(
  '@repositories/implementations/MongoDBPalettesRepository',
);

const publicPaletteId = 'palette1111';
const privatePaletteId = 'palette2222';
const paletteCollection = [
  new Palette(
    {
      isPublic: true,
      name: 'Paleta Legal',
      ownerId: 'user1111',
      authorizeChange: ['user1111'],
      colors: [],
      membersId: ['user1111'],
    },
    'palette1111',
  ),

  new Palette(
    {
      isPublic: false,
      name: 'Paleta Ultra foda',
      ownerId: 'user2222',
      authorizeChange: ['user2222'],
      colors: [],
      membersId: ['user2222'],
    },
    'palette2222',
  ),
];

describe('Testes unitários de GetPublicPalette', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    repository.getPaletteById = jest.fn().mockImplementation(
      async (paletteId: string) => (
        new Promise((resolve) => (
          resolve(
            paletteCollection.find((palette) => palette._id === paletteId && palette.isPublic),
          )
        ))
      ),
    );
  });

  test('Deve retornar a paleta pública quando passado um id de paleta pública ', async () => {
    const useCase = new GetPublicPaletteUseCase(repository);

    await expect(useCase.execute({ paletteId: publicPaletteId }))
      .resolves
      .toBe<Palette>(paletteCollection[0]);
    expect(repository.getPaletteById).toBeCalled();
  });

  test('Deve lançar exceção ao tentar recuperar paleta privada.', async () => {
    const useCase = new GetPublicPaletteUseCase(repository);

    await expect(useCase.execute({ paletteId: privatePaletteId }))
      .rejects
      .toThrowError(new Error("This palette doesn't exists!"));
    expect(repository.getPaletteById).toBeCalled();
  });
});
