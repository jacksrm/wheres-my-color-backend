import { Color } from '@entities/Color';
import { Palette } from '@entities/Palette';

export const publicPaletteId = 'palette1111';
export const privatePaletteId = 'palette3333';

export const createPaletteData = {
  ownerId: 'user1111',
  name: 'Banido... Banido... Banido...',
  isPublic: false,
};

export const changePaletteData = (
  {
    isPublic: false,
    name: 'Paleta de Edinaldo Pereira',
    paletteId: 'palette1111',
  }
);

export const paletteCollection = () => [
  new Palette(
    {
      isPublic: true,
      name: 'What is the brother',
      ownerId: 'user1111',
      authorizeChange: ['user1111'],
      colors: [
        new Color({
          values: {
            hex: '#0000FF',
            rgb: '(0,0,255)',
          },
          title: 'blue',
        }, 'color1111'),
        new Color({
          values: {
            hex: '#FF0000',
            rgb: '(255,0,0)',
          },
          title: 'red',
        }, 'color2222'),
        new Color({
          values: {
            hex: '#00FF00',
            rgb: '(0,255,0)',
          },
          title: 'green',
        }, 'color3333'),
      ],
      membersId: ['user1111'],
    },
    'palette1111',
  ),
  new Palette(
    {
      isPublic: true,
      name: 'Você vale nada',
      ownerId: 'user1111',
      authorizeChange: ['user1111'],
      colors: [],
      membersId: ['user1111'],
    },
    'palette2222',
  ),
  new Palette(
    {
      isPublic: false,
      name: 'Você vale tudo',
      ownerId: 'user1111',
      authorizeChange: ['user1111'],
      colors: [],
      membersId: ['user1111'],
    },
    'palette3333',
  ),
  new Palette(
    {
      isPublic: true,
      name: 'Paleta de Jack 1',
      ownerId: 'user2222',
      authorizeChange: ['user2222'],
      colors: [],
      membersId: ['user2222'],
    },
    'palette4444',
  ),
  new Palette(
    {
      isPublic: true,
      name: 'Paleta de Jack 2',
      ownerId: 'user2222',
      authorizeChange: ['user2222'],
      colors: [],
      membersId: ['user2222'],
    },
    'palette5555',
  ),
  new Palette(
    {
      isPublic: false,
      name: 'Paleta de Jack 3',
      ownerId: 'user2222',
      authorizeChange: ['user2222'],
      colors: [],
      membersId: ['user2222'],
    },
    'palette6666',
  ),
];
