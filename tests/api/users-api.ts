import type { APIRequestContext, APIResponse } from '@playwright/test';

export class UsersApi {
  private readonly usersPath: string;

  constructor(
    private readonly request: APIRequestContext,
    usersPath: string,
  ) {
    this.usersPath = usersPath.replace(/\/$/, '');
  }

  getUser(userId: string | number): Promise<APIResponse> {
    return this.request.get(`${this.usersPath}/${encodeURIComponent(userId)}`);
  }

  getUsers(pageNumber: number): Promise<APIResponse> {
    const query = new URLSearchParams({ page: String(pageNumber) });
    return this.request.get(`${this.usersPath}?${query.toString()}`);
  }

  createUser(userData: object): Promise<APIResponse> {
    return this.request.post(this.usersPath, { data: userData });
  }

  replaceUser(userId: string | number, userData: object): Promise<APIResponse> {
    return this.request.put(`${this.usersPath}/${encodeURIComponent(userId)}`, {
      data: userData,
    });
  }

  patchUser(userId: string | number, userData: object): Promise<APIResponse> {
    return this.request.patch(`${this.usersPath}/${encodeURIComponent(userId)}`, {
      data: userData,
    });
  }

  deleteUser(userId: string | number): Promise<APIResponse> {
    return this.request.delete(`${this.usersPath}/${encodeURIComponent(userId)}`);
  }
}
