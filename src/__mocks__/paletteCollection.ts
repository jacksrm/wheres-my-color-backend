import Palette from '@entities/Palette';

export const paletteCollection = () => [
  new Palette(
    {
      isPublic: true,
      name: 'What is the brother',
      ownerId: 'user1111',
      authorizeChange: ['user1111'],
      colors: [],
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
