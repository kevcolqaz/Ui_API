import { test, expect } from './fixtures/api-fixtures';
import testData from '../test-data/api-users.json';

test(testData.reqres.testNames.getUser, async ({ usersApi, apiTestData }) => {
  await test.step('GET the configured user', async () => {
    const response = await usersApi.getUser(apiTestData.reqres.targetUserId);
    expect(response.status()).toBe(apiTestData.reqres.expectedStatus.get);

    const body = await response.json();
    expect(body.data).toMatchObject({
      id: apiTestData.reqres.expectedUser.id,
      email: apiTestData.reqres.expectedUser.email,
      first_name: apiTestData.reqres.expectedUser.firstName,
      last_name: apiTestData.reqres.expectedUser.lastName,
    });
  });
});

test(testData.reqres.testNames.listUsers, async ({ usersApi, apiTestData }) => {
  await test.step('GET the configured page of users', async () => {
    const response = await usersApi.getUsers(apiTestData.reqres.listPage);
    expect(response.status()).toBe(apiTestData.reqres.expectedStatus.list);

    const body = await response.json();
    expect(body.page).toBe(apiTestData.reqres.listPage);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toMatchObject({
      id: expect.any(Number),
      email: expect.stringMatching(/^[^@]+@[^@]+\.[^@]+$/),
    });
  });
});

test(testData.reqres.testNames.crudChain, async ({ usersApi, apiTestData }) => {
  let createdUserId = '';

  await test.step('POST a user and capture its generated ID', async () => {
    const response = await usersApi.createUser(apiTestData.reqres.createUser);
    expect(response.status()).toBe(apiTestData.reqres.expectedStatus.create);

    const body: { id?: unknown; createdAt?: unknown } = await response.json();
    if (typeof body.id !== 'string' || typeof body.createdAt !== 'string') {
      throw new Error('ReqRes create-user response is missing its ID or creation timestamp.');
    }

    expect(body.id).toBeTruthy();
    expect(Number.isNaN(Number(body.id))).toBe(false);
    expect(Date.parse(body.createdAt)).not.toBeNaN();
    createdUserId = body.id;
  });

  await test.step('PUT the created user', async () => {
    const response = await usersApi.replaceUser(
      createdUserId,
      apiTestData.reqres.replaceUser,
    );
    expect(response.status()).toBe(apiTestData.reqres.expectedStatus.update);
    expect(Date.parse((await response.json()).updatedAt)).not.toBeNaN();
  });

  await test.step('PATCH the created user', async () => {
    const response = await usersApi.patchUser(
      createdUserId,
      apiTestData.reqres.patchUser,
    );
    expect(response.status()).toBe(apiTestData.reqres.expectedStatus.update);
    expect(Date.parse((await response.json()).updatedAt)).not.toBeNaN();
  });

  await test.step('DELETE the created user', async () => {
    const response = await usersApi.deleteUser(createdUserId);
    expect(response.status()).toBe(apiTestData.reqres.expectedStatus.delete);
  });
});

test(
  testData.reqres.testNames.missingUser,
  async ({ usersApi, apiTestData }) => {
    await test.step('GET a user ID that does not exist', async () => {
      const response = await usersApi.getUser(apiTestData.reqres.missingUserId);
      expect(response.status()).toBe(apiTestData.reqres.expectedStatus.notFound);
      expect(await response.json()).toEqual({});
    });
  },
);

test(
  testData.reqres.testNames.malformedUserId,
  async ({ usersApi, apiTestData }) => {
    await test.step('GET a user with a malformed ID', async () => {
      const response = await usersApi.getUser(apiTestData.reqres.malformedUserId);
      expect(response.status()).toBe(apiTestData.reqres.expectedStatus.notFound);
      expect(await response.json()).toEqual({});
    });
  },
);
