import 'dotenv/config';
import supertest from 'supertest';
import { mockRepos } from '@mocks/index';
import { paletteCollection } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { connection } from '@repositories/connection';
import { app } from '../../../app';
import { getUserPalettesModule } from '.';

const repos = mockRepos();
const getUser = getUserPalettesModule(repos);
describe('Testes Unitários de GetUserPalettes - Authenticated', () => {
  test('Testa se ao passar um id as paletas do usuário são retornadas', async () => {
    const idToFind = userCollection()[0]._id;
    const matched = await getUser.useCase({ ownerId: idToFind });

    matched.forEach((paletteFound) => {
      const check = paletteCollection().some(
        (paletteStored) => paletteStored._id === paletteFound._id,
      );

      expect(check).toBeTruthy();
    });
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

describe('Testes de Integração de GetUserPalettes - Authenticated', () => {
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

  test('Deve retornar as paletas do usuário quando autenticado corretamente', async () => {
    const response = await supertest(app)
      .get('/v1/user/palettes')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('palettes');
    expect(response.body.palettes).toHaveLength(2);
  });
});
