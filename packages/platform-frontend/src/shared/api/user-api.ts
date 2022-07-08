import { ApiClient } from './api-client';

export class UserApi {
  private static instance: UserApi | null = null;

  static getInstance() {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }

    return UserApi.instance;
  }

  async getUser() {
    const res = await ApiClient.getInstance().fetch(
      `${ApiClient.API_URL}/user`,
      {
        method: 'GET',
      }
    );

    return await res.json();
  }
}
