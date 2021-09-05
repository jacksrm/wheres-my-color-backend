import User from '@entities/User';

export const userCollection = () => [
  new User(
    {
      email: 'edinaldopereira@meuapp.com',
      password: '1234567890',
      username: 'EdinaldoPereira',
      profilePicture: '',
    },
    'user1111',
  ),
  new User(
    {
      email: 'jacson@meuapp.com',
      password: '1234567890',
      username: 'JackRodrigues',
      profilePicture: '',
    },
    'user2222',
  ),
];
