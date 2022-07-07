import { ApiClient } from './api-client';

export class AuthApi {
  private static instance: AuthApi | null = null;

  static getInstance() {
    if (!AuthApi.instance) {
      AuthApi.instance = new AuthApi();
    }

    return AuthApi.instance;
  }

  async signIn({
    userEmail,
    userPassword,
  }: {
    userEmail: string;
    userPassword: string;
  }) {
    const apiClient = ApiClient.getInstance();
    const res = await apiClient.fetch(`${ApiClient.API_URL}/auth/signIn`, {
      method: 'POST',
      body: JSON.stringify({
        userEmail,
        userPassword,
      }),
    });

    const data = await res.json();
    apiClient.setBearerToken(data.accessToken);

    return data;
  }

  async signUp({
    userEmail,
    userPassword,
  }: {
    userEmail: string;
    userPassword: string;
  }) {
    const res = await ApiClient.getInstance().fetch(
      `${ApiClient.API_URL}/auth/signUp`,
      {
        method: 'POST',
        body: JSON.stringify({
          userEmail,
          userPassword,
        }),
      }
    );

    return await res.json();
  }

  async refresh() {
    const apiClient = ApiClient.getInstance();
    const res = await apiClient.fetch(
      `${ApiClient.API_URL}/auth/refresh`,
      {
        method: 'POST',
      },
      true
    );

    const data = await res.json();
    apiClient.setBearerToken(data.accessToken);
    return data;
  }

  async logout() {
    const apiClient = ApiClient.getInstance();
    const res = apiClient.fetch(`${ApiClient.API_URL}/auth/logout`, {
      method: 'POST',
    });

    apiClient.setBearerToken();

    return await res.json();
  }
}
