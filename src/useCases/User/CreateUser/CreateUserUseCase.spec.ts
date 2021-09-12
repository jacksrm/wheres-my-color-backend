import 'dotenv/config';
import supertest from 'supertest';
import { mockRepos } from '@mocks/index';
import {
  newUserData,
  conflictEmailUserData,
  conflictUsernameUserData,
} from '@mocks/userCollection';
import { app } from '../../../app';
import { createUserModule } from '.';

const repos = mockRepos();
const createUser = createUserModule(repos);

describe('Testes de CreateUserUseCase.', () => {
  test('testa se ao passar os dados do usuário, um novo registro é criado', async () => {
    const newUser = await createUser.useCase(newUserData);

    expect(newUser).toBeDefined();
    expect(newUser._id).toBeDefined();
  });

  test('testa se ao passar email conflitante, lança uma exceção com a mensagem "Email already registered!!"', async () => {
    await expect(createUser.useCase(conflictEmailUserData)).rejects.toThrow(
      new Error('Email already registered!!'),
    );
  });

  test('testa se ao passar username conflitante, lança uma exceção com a mensagem "Username already registered!!"', async () => {
    await expect(createUser.useCase(conflictUsernameUserData)).rejects.toThrow(
      new Error('Username already registered!!'),
    );
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

jest.setTimeout(30000);

let token: string;

describe('Testes de Integração de GetUser - Public', () => {
  afterEach(async () => {
    const response = await supertest(app)
      .post('/v1/login')
      .set('Content-Type', 'application/json')
      .send({
        email: loginUserData.email,
        password: loginUserData.password,
      });

    token = response.body.token;

    await supertest(app)
      .delete('/v1/user/profile/')
      .auth(token, { type: 'bearer' });
  });

  test('Ao passar dados válidos deve ser criado um usuário e retornado um status 201 com a mensagem "User created successfully!"', async () => {
    const response = await supertest(app)
      .post('/v1/user/create')
      .send(createUserData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User created successfully!');
  });
});
