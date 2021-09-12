import 'dotenv/config';
import supertest from 'supertest';

import { mockRepos } from '@mocks/index';
import { userCollection } from '@mocks/userCollection';

import { app } from '../../../app';
import { deleteUserModule } from '.';
import { DeleteUserError } from './DeleteUserError';

const INVALID_ID_ERROR = new DeleteUserError(
  404,
  "There's no user with the provided ID!",
);

const repos = mockRepos();
const deleteUserMock = deleteUserModule(repos);
const users = userCollection();

describe('Testes unitários de DeleteUser', () => {
  test('Deve remover usuário caso seja passado o ID do usuário.', async () => {
    await expect(
      deleteUserMock.useCase({
        userId: users[0]._id,
      }),
    ).resolves.not.toThrow();
  });

  test(`Deve lançar uma exceção ao passar um ID inválido com a mensagem "${INVALID_ID_ERROR.message}"`, async () => {
    await expect(
      deleteUserMock.useCase({
        userId: 'invalid id',
      }),
    ).rejects.toThrow(INVALID_ID_ERROR);
  });
});

const createUserData = {
  username: 'JackSRSupertest',
  email: 'jacksupertest@meuapp.com',
  password: '1234567890',
};

const loginUserData = {
  email: 'jacksupertest@meuapp.com',
  password: '1234567890',
};

let token: string;

let usersBefore: any[];
let usersAfter: any[];

jest.setTimeout(30000);

describe('Testes de Integração de DeleteUser', () => {
  beforeEach(async () => {
    await supertest(app).post('/v1/user/create').send(createUserData);

    const response = await supertest(app)
      .post('/v1/login')
      .set('Content-Type', 'application/json')
      .send({
        email: loginUserData.email,
        password: loginUserData.password,
      });

    token = response.body.token;

    const { body } = await supertest(app)
      .get('/v1')
      .set('Accept', 'application/json');

    usersBefore = body;
  });

  afterEach(async () => {
    const { body } = await supertest(app)
      .get('/v1')
      .set('Accept', 'application/json');

    usersAfter = body;

    expect(usersAfter.length).toBeLessThan(usersBefore.length);
  });

  test('Deve remover usuários e retornar status 200 com a mensagem "User removed successfully!"', async () => {
    const response = await supertest(app)
      .delete('/v1/user/profile/')
      .auth(token, { type: 'bearer' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User removed successfully!');
  });
});
