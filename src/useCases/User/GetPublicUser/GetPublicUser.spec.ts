import 'dotenv/config';
import supertest from 'supertest';
import { mockRepos } from '@mocks/index';
import { userCollection } from '@mocks/userCollection';
import { app } from '../../../app';
import { getPublicUserModule } from '.';

const repos = mockRepos();
const getUser = getPublicUserModule(repos);
const userToFind = userCollection()[0];

describe('Testes Unitários de GetUser - Public.', () => {
  test('Testa se ao passar o id do usuário, seus dados são retornados, exceto password', async () => {
    const match = await getUser.useCase({ userId: userToFind._id });
    const { password, email, ...toCheck } = userToFind;
    expect(match).toEqual(toCheck);
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

let userId: string;

describe('Testes de Integração de GetUser - Public', () => {
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

    const { body: { user } } = await supertest(app)
      .get('/v1/user/profile')
      .auth(token, { type: 'bearer' });

    userId = user._id;
  });

  afterEach(async () => {
    await supertest(app)
      .delete('/v1/user/profile/')
      .auth(token, { type: 'bearer' });
  });

  test('Deve retornar retornar os dados públicos do usuário ao passar o ID', async () => {
    const response = await supertest(app)
      .get(`/v1/user/profile/public/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).toHaveProperty('_id');
    expect(response.body.user.username).toEqual(createUserData.username);
  });
});
