import 'dotenv/config';
import supertest from 'supertest';
import { User } from '@entities/User';
import { mockRepos } from '@mocks/index';
import { createPaletteData } from '@mocks/paletteCollection';
import { connection } from '@repositories/connection';
import { createPaletteModule } from '.';
import { app } from '../../../app';
import { ICreatePaletteRequestDTO } from './CreatePaletteDTO';

const repos = mockRepos();
const createPalette = createPaletteModule(repos);

describe('Testes de CreatePalette.', () => {
  test('Testa se ao passar os dados da paleta, a paleta é criada', async () => {
    const newPalette = await createPalette.useCase(createPaletteData);

    expect(newPalette).toBeDefined();
    expect(newPalette._id).toBeDefined();
    expect(newPalette.authorizeChange).toEqual([newPalette.ownerId]);
    expect(newPalette.membersId).toEqual([newPalette.ownerId]);
  });
});

jest.setTimeout(30000);

describe('Testes de Integração de CreatePalette.', () => {
  const createUserData = {
    username: 'JackSRSupertest',
    email: 'jacksupertest@meuapp.com',
    password: '1234567890',
  };

  const createPaletteData2: ICreatePaletteRequestDTO = {
    name: 'Paleta massa',
    isPublic: true,
  } as ICreatePaletteRequestDTO;

  const loginUserData = {
    email: 'jacksupertest@meuapp.com',
    password: '1234567890',
  };

  let token: string;

  let user: User;

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

    const getResponse = await supertest(app)
      .get('/v1/user/profile')
      .auth(token, { type: 'bearer' });
    user = getResponse.body.user;
    createPaletteData2.ownerId = user._id;
  });

  afterEach(async () => {
    await supertest(app)
      .delete('/v1/user/profile/')
      .auth(token, { type: 'bearer' });
  });

  test('Testa se uma paleta é adicionada ao usuário autenticado', async () => {
    const response = await supertest(app)
      .post('/v1/palette/create')
      .send(createPaletteData2)
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      `Palette "${createPaletteData2.name}" was added successfully!`,
    );
  });
});
