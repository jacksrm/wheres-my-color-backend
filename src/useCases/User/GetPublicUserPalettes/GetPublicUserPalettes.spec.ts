import 'dotenv/config';
import supertest from 'supertest';
import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { connection } from '@repositories/connection';
import { app } from '../../../app';
import { getPublicUserPalettesModule } from '.';

const repos = mockRepos();
const getPublicUserPalettes = getPublicUserPalettesModule(repos);
const userToFind = userCollection()[0];
const palettes = paletteCollection().filter(
  (palette) => palette.ownerId === userToFind._id && palette.isPublic,
);

describe('Testes Unitários de GetUserPalettes - Public', () => {
  test('Testa se ao passar o id do dono, suas paletas públicas são retornadas', async () => {
    const match = await getPublicUserPalettes.useCase({ ownerId: userToFind._id });
    expect(match).toEqual(palettes);
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

const createPalettes = [
  {
    name: 'Paleta Massa 1',
    isPublic: false,
  },
  {
    name: 'Paleta Massa 2',
    isPublic: true,
  },
];

jest.setTimeout(30000);

let token: string;

let ownerId: string;

describe('Testes de Integração de GetUserPalettes - Public', () => {
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

    const { body: { user } } = await supertest(app)
      .get('/v1/user/profile')
      .auth(token, { type: 'bearer' });

    ownerId = user._id;

    createPalettes.forEach(async (palette) => {
      await supertest(app)
        .post('/v1/palette/create')
        .auth(token, { type: 'bearer' })
        .send(palette);
    });
  });

  afterEach(async () => {
    await supertest(app)
      .delete('/v1/user/profile/')
      .auth(token, { type: 'bearer' });
  });

  test('Deve retornar as paletas públicas do usuário', async () => {
    const response = await supertest(app)
      .get(`/v1/user/palettes/public/${ownerId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('palettes');
    expect(response.body.palettes).toHaveLength(1);
  });
});
