import { test as base, expect } from '@playwright/test';
import apiTestData from '../../test-data/api-users.json';
import { UsersApi } from '../users-api';

type ApiFixtures = {
  usersApi: UsersApi;
  apiTestData: typeof apiTestData;
};

export const test = base.extend<ApiFixtures>({
  usersApi: async ({ request }, use) => {
    const usersApi = new UsersApi(request, apiTestData.reqres.usersPath);
    await use(usersApi);
  },
  apiTestData: async ({}, use) => {
    await use(apiTestData);
  },
});

export { expect };
