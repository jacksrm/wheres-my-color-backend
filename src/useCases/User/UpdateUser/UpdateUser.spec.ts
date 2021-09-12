import { User } from '@entities/User';
import { mockRepos } from '@mocks/index';
import { conflictEmailUserData, conflictUsernameUserData, updateUserData, userCollection } from '@mocks/userCollection';
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
