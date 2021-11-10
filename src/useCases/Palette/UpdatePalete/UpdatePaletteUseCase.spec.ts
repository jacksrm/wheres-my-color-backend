import 'dotenv/config';
import supertest from 'supertest';
import { User } from '@entities/User';
import { mockRepos } from '@mocks/index';
import { changePaletteData } from '@mocks/paletteCollection';
import { userCollection } from '@mocks/userCollection';
import { connection } from '@repositories/connection';
import { app } from 'app';
import { updatePaletteModule } from '.';
import { ICreatePaletteRequestDTO } from '../CreatePalette/CreatePaletteDTO';

import { UpdatePaletteError } from './UpdatePaletteError';

const repos = mockRepos();
const users = userCollection();
const updatePalette = updatePaletteModule(repos);

describe('Testes de UpdatePalette', () => {
  test('Ao passar dados corretos atualiza a paleta.', async () => {
    const newPalette = await updatePalette.useCase(changePaletteData, users[0]._id);

    expect(newPalette).toBeDefined();
    if (newPalette) expect(newPalette.name).toEqual(changePaletteData.name);
  });

  test('Ao passar o ID do user não autorizado retorna um erro com a mensagem "Unauthorized!', async () => {
    await expect(updatePalette.useCase(changePaletteData, users[1]._id))
      .rejects
      .toThrow(new UpdatePaletteError(401, 'Unauthorized!'));
  });

  test('Ao passar o ID da paleta inválido retorna um erro com a mensagem "Can\'t update this palette!"!', async () => {
    changePaletteData.paletteId = 'id inválido';
    await expect(updatePalette.useCase(changePaletteData, users[0]._id))
      .rejects
      .toThrow(new UpdatePaletteError(404, "Can't update this palette!"));
  });
});

describe('Testes de Integração de UpdatePalette', () => {
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
});
