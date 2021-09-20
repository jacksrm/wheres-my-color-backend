import 'dotenv/config';
import supertest from 'supertest';
import { User } from '@entities/User';
import { mockRepos } from '@mocks/index';
import { conflictEmailUserData, conflictUsernameUserData, updateUserData, userCollection } from '@mocks/userCollection';
import { connection } from '@repositories/connection';
import { app } from '../../../app';
import { updateUserModule } from '.';

const INVALID_ID_ERROR = new Error("There's a problema with your request!");
const EMAIL_ALREADY_EXISTS_ERROR = new Error('Email already registered!');
const USERNAME_ALREADY_EXISTS_ERROR = new Error('Username already registered!');

const repos = mockRepos();
const updateUser = updateUserModule(repos);
const users = userCollection();

describe('Testes unitários de UpdateUser', () => {
  test('Deve atualizar um usuário ao passar o ID correto.', async () => {
    const result = await updateUser.useCase({
      ...updateUserData,
      _id: users[1]._id,
    });

    expect(result).toEqual(new User(updateUserData, users[1]._id));
  });

  test(`Deve lançar uma exceção ao não passar um ID de usuário correto com a mensagem "${INVALID_ID_ERROR.message}""`, async () => {
    await expect(updateUser.useCase({ _id: 'id inválido!' }))
      .rejects
      .toThrow(INVALID_ID_ERROR);
  });

  test(`Deve lançar uma exceção ao tentar mudar para um email já existente com a mensagem "${EMAIL_ALREADY_EXISTS_ERROR.message}""`, async () => {
    await expect(updateUser.useCase({
      _id: users[1]._id,
      email: conflictEmailUserData.email,
    }))
      .rejects
      .toThrow(EMAIL_ALREADY_EXISTS_ERROR);
  });

  test(`Deve lançar uma exceção ao tentar mudar para um username já existente com a mensagem "${USERNAME_ALREADY_EXISTS_ERROR.message}""`, async () => {
    await expect(updateUser.useCase({
      _id: users[1]._id,
      username: conflictUsernameUserData.username,
    }))
      .rejects
      .toThrow(USERNAME_ALREADY_EXISTS_ERROR);
  });
});

const createUserData = {
  username: 'JackSRSupertest',
  email: 'jacksupertest@meuapp.com',
  password: '1234567890',
};

const updateUserData2 = {
  username: 'JackSRSupertestUpdated',
  email: 'jacksupertestupdated@meuapp.com',
  password: '0987654321',
};

const loginUserData = {
  email: 'jacksupertest@meuapp.com',
  password: '1234567890',
};

jest.setTimeout(30000);

let token: string;

describe('Testes de Integração de UpdateUser', () => {
  const dbConnection = connection();

  beforeAll(async () => {
    await dbConnection.start();
  });

  afterAll(async () => {
    await dbConnection.close();
  });

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
  });

  afterEach(async () => {
    await supertest(app)
      .delete('/v1/user/profile/')
      .auth(token, { type: 'bearer' });
  });

  test('Deve atualizar o usuário corretamente e retornar código 200 com a mensagem "User updated successfully!"', async () => {
    const response = await supertest(app)
      .put('/v1/user/profile')
      .auth(token, { type: 'bearer' })
      .send(updateUserData2);

    const { body: { user } } = await supertest(app)
      .get('/v1/user/profile')
      .auth(token, { type: 'bearer' });

    const userToCompare = user;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User updated successfully!');
    expect(userToCompare.email).toBe(updateUserData2.email);
    expect(userToCompare.username).toBe(updateUserData2.username);
  });
});
