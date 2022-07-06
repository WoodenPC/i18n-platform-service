class ApiClient {
  private static instance: ApiClient | null = null;

  private headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  static API_URL: string = process.env.API_URL || 'http://localhost:8080/api';

  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  setBearerToken(token: string) {
    this.headers.Authorization = `Bearer ${token}`;

  }

  async fetch(endpoint: RequestInfo | URL, args?: RequestInit, disableRefreshInterceptor?: boolean) {
    const originalRes = await window.fetch(endpoint, {
      ...(args || {}),
      credentials: 'include',
      headers: this.headers,
    });

    if (originalRes.status === 401 && !disableRefreshInterceptor) {
      // interceptor for bearer refresh attempt
      const authRes = await window.fetch(`${ApiClient.API_URL}/auth/refresh`, {
        credentials: 'include',
      });

      const data = await authRes.json();
      this.setBearerToken(data.accessToken);

      return await window.fetch(endpoint, {
        ...(args || {}),
        credentials: 'include',
        headers: this.headers,
      });
    }

    if (!originalRes.ok) {
      throw new Error(originalRes.statusText);
    }

    return originalRes;
  }
}

export { ApiClient };
