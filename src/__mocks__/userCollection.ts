import User from '@entities/User';

export const validLoginData = {
  email: 'edinaldopereira@meuapp.com',
  password: '1234567890',
};

export const invalidLoginEmail = {
  email: 'emailinvalido@meuapp.com',
  password: '1234567890',
};

export const invalidLoginPass = {
  email: 'edinaldopereira@meuapp.com',
  password: 'senhainvalida',
};

export const newUserData = {
  username: 'NewUser',
  email: 'newuser@meuapp.com',
  password: '1234567890',
};

export const conflictEmailUserData = {
  username: 'JackSR',
  email: 'jacson@meuapp.com',
  password: '1234567890',
};

export const conflictUsernameUserData = {
  username: 'JackRodrigues',
  email: 'jacsonrodrigues@meuapp.com',
  password: '1234567890',
};

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
